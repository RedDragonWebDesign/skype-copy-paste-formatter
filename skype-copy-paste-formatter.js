// Copyright https://www.RedDragonWebDesign.com/
// Permission required to use or copy code. All rights reserved.

"use strict";

class SkypeCopyPasteFormatter {
	unformattedText = "";
	formattedText = "";
	username1 = "";
	username2 = "";
	lines = {};
	
	getFormattedText(unformattedText, username1) {
		this.unformattedText = unformattedText;
		
		// if we already formatted this text
		if ( this.unformattedText.trim().left(2) === '[[' ) {
			return this.unformattedText;
		}
		
		this.username1 = username1;
		this._findOtherUsername();
		this.currentUsername = "";
		this._makeLinesObject();
		this._fixUsernameOnFirstLines();
		
		this.formattedText = this._convertLinesObjectToString();
		
		return this.formattedText;
	}
	
	/** The first couple of lines don't have a username yet. Find the first known username, then use that to fix these first couple of lines. */
	_fixUsernameOnFirstLines() {
		let firstLinesUsername = "";
		
		// find first known username, set firstLinesUsername variable to opposite username
		for ( let key in this.lines ) {
			let username = this.lines[key]['username'];
			
			if ( username ) {
				if ( username === this.username1 ) {
					firstLinesUsername = this.username2;
				} else if ( username === this.username2 ) {
					firstLinesUsername = this.username1;
				}
				
				break;
			}
		}
		
		// if there is no 2nd username
		if ( ! firstLinesUsername ) {
			firstLinesUsername = this.username1;
		}
		
		// iterate through first few lines, set them to firstLinesUsername
		for ( let key in this.lines ) {
			let username = this.lines[key]['username'];
			
			if ( ! username ) {
				this.lines[key]['username'] = firstLinesUsername;
			} else {
				break;
			}
		}
	}
	
	/** Makes this.lines. Also deletes blank lines, and marks lines that are times/usernames. */
	_makeLinesObject() {
		let lines = this.unformattedText.split("\n");
		this.lines = {};
		let currentUsername = "";
		
		for ( let key in lines ) {
			let value = lines[key];
			let isTime = false;
			
			// if line contains a time (which is how we know username is changing)
			if ( value.search(/^((.*), )?\d{1,2}:\d{2} (AM|PM)$/m) !== -1 ) {
				isTime = true;
				
				if ( value.search(/^(.*), \d{1,2}:\d{2} (AM|PM)$/m) !== -1 ) {
					currentUsername = this.username2;
				} else {
					currentUsername = this.username1;
				}
			}
			
			// delete blank lines & times
			if ( value && ! isTime ) {
				this.lines[key] = {
					"username": currentUsername,
					"text": value,
				};
			}
		}
	}
	
	_findOtherUsername() {
		var myRegexp = /^(.*), \d{1,2}:\d{2} (AM|PM)$/m;
		var match = myRegexp.exec(this.unformattedText);
		if ( match ) {
			this.username2 = match[1];
		}
	}
	
	_convertLinesObjectToString() {
		let s = "";
		for ( let key in this.lines ) {
			s += '[[' + this.lines[key]['username'] + "]] " + this.lines[key]['text'] + "\n";
		}
		return s.trim();
		
		// for debugging:
		// return JSON.stringify(this.lines).replace(/\},"/g, "\"\n\"");
	}
}

Object.assign(String.prototype, {
	/** @description "Testing 123".left(4) = "Test" */
	left(length) {
		return this.slice(0, length);
	},
});

window.addEventListener('DOMContentLoaded', (e) => {
	let username = document.getElementById('username');
	let log = document.getElementById('log');
	let format = document.getElementById('format');
	
	format.addEventListener('click', function(e) {
		let formatter = new SkypeCopyPasteFormatter();
		log.value = formatter.getFormattedText(log.value, username.value);
	});
});