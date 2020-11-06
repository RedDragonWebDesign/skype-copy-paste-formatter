// Copyright https://www.RedDragonWebDesign.com/
// Permission required to use or copy code. All rights reserved.

"use strict";

class SkypeCopyPasteFormatter {
	unformattedText = "";
	formattedText = "";
	username1 = ""; // name from "Your Username" text box
	username2 = ""; // name extracted from log, interlocutor username
	line1Username = ""; // name from "Line 1 Username" text box
	lines = {};
	linesWithKnownUsernameCount = 0;
	
	getFormattedText(unformattedText, username1, line1Username) {
		this.unformattedText = unformattedText;
		
		let alreadyFormatted = this.unformattedText.trim().startsWith('[[');
		if ( alreadyFormatted ) {
			return this.unformattedText;
		}
		
		this._removeFancyPunctuation();
		this.username1 = username1 ? username1 : '???';
		this.line1Username = line1Username ? line1Username : '???';
		this._findOtherUsername();
		this.currentUsername = "";
		this._makeLinesObject();
		this._fixUsernameOnFirstLines();
		
		this.formattedText = this._convertLinesObjectToString();
		
		return this.formattedText;
	}
	
	_removeFancyPunctuation() {
		// I spotted some fancy quotes in a Skype message. I was unable to duplicate, but let's replace some common MS Office fancy characters just in case.
		let fancyPunctuation = {
			'“': '"',
			'”': '"',
			'‘': '\'',
			'’': '\'',
			'¼': '1/4',
			'½': '1/2',
			'¾': '3/4',
			'–': '-',
			'—': '--',
			'…': '...',
		};
		
		for ( let rule in fancyPunctuation ) {
			this.unformattedText = this._globalReplace(this.unformattedText, rule, fancyPunctuation[rule]);
		}
	}
	
	// https://stackoverflow.com/a/542260/3480193
	_globalReplace(original, searchTxt, replaceTxt) {
		const regex = new RegExp(searchTxt, 'g');
		return original.replace(regex, replaceTxt) ;
	}
	
	/** The first couple of lines don't have a username yet. Replace it with this.line1Username */
	_fixUsernameOnFirstLines() {
		for ( let key in this.lines ) {
			let username = this.lines[key]['username'];
			
			if ( ! username ) {
				this.lines[key]['username'] = this.line1Username;
			} else {
				break;
			}
		}
	}
	
	/** Makes this.lines. Also deletes blank lines, and marks lines that are times/usernames. */
	_makeLinesObject() {
		// Split in a couple different spots:
		// - newline character
		// - the pattern Text text text.Text text text. (split at the period)
		// - the pattern Text text text?Text text text. (split at the question mark)
		// - the pattern Text text text!Text text text. (split at the exclamation mark)
		let lines = this.unformattedText.split(/(?<=(?:\.|\?|!))(?=[A-Z])/).join("\n").split("\n");
		this.lines = {};
		let currentUsername = "";
		
		for ( let key in lines ) {
			let value = lines[key];
			let isTime = false;
			
			// if line contains a time (which is how we know username is changing)
			if ( value.search(/^((.*), )?\d{1,2}:\d{2} (AM|PM)$/m) !== -1 ) {
				isTime = true;
				this.linesWithKnownUsernameCount++;
				
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
			s += '[[' + this.lines[key]['username'] + "]] " + this.lines[key]['text'].trim() + "\n";
		}
		return s.trim();
		
		// for debugging:
		// return JSON.stringify(this.lines).replace(/\},"/g, "\"\n\"");
	}
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

function setValueAndUpdateUndoStack(textarea, text) {
	// Must select all, so that the old text is deleted.
	textarea.focus();
	textarea.select();
	
	// https://stackoverflow.com/a/55174561/3480193
	if ( ! document.execCommand('insertText', false, text) ) {
		textarea.setRangeText(text);
	}
}

window.addEventListener('DOMContentLoaded', (e) => {
	let username = document.getElementById('username');
	let line1Username = document.getElementById('line-1-username');
	let log = document.getElementById('log');
	let format = document.getElementById('format');
	
	let cookieUsername = getCookie('username');
	if ( cookieUsername ) {
		username.value = cookieUsername;
	}
	
	let cookieLine1Username = getCookie('line1Username');
	if ( cookieLine1Username ) {
		line1Username.value = cookieLine1Username;
	}
	
	format.addEventListener('click', function(e) {
		let formatter = new SkypeCopyPasteFormatter();
		let newText = formatter.getFormattedText(log.value, username.value, line1Username.value);
		setValueAndUpdateUndoStack(log, newText);
		
		document.cookie = 'username=' + username.value;
		document.cookie = 'line1Username=' + line1Username.value;
	});
});