<!DOCTYPE html>

<html lang="en-us">

<head>
	<title>Skype Copy Paste Formatter</title>
	<link rel="stylesheet" href="style.css" />
	<script type="module" src="skype-copy-paste-formatter.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
	<h1>
	Skype Copy Paste Formatter
	</h1>
	
	<p>
	Skype copy paste is truly awful these days. The text is lacking names, has way too many line breaks, and is hard to read. This tool will format the log in the style that was more popular back in the days of AIM, MSN, and Trillian. It will put the person's name in front of every line.
	</p>
	
	<table>
		<tr>
			<td>
				<strong>Your Username:</strong>
			</td>
			<td>
				<input type="text" id="username" value="Jeff22">
			</td>
		</tr>
		<tr>
			<td>
				<strong>Other Username:</strong>
			</td>
			<td>
				[Will Be Detected]
			</td>
		</tr>
		<tr>
			<td>
				<strong>Line 1 Username:</strong>
			</td>
			<td>
				<input type="radio" name="line-1-username" value="you" checked>You 
				<input type="radio" name="line-1-username" value="other-person">Other Person
			</td>
		</tr>
	</table>
	
	<p>
	<textarea id="log">I'm getting ready to consider 2k (not 4k) for a main monitor 

But, I don't want to spend too much

7:27 PM
Have you tried out 2k? Is it noticeably better?

Bob44, 7:27 PM
I have not.

But its gonna be awhile before 4k

Cause gaming still not there

7:28 PM
Yeah. Gpus are getting good, but increasing res and hz brings them back down to mediocre

Bob44, 7:28 PM
Yeah, but 4k can't even have 144hz yet

And it stresses out the VC more than 1080p or 2k</textarea>
	</p>
	
	<p>
	<button id="format">Format Skype Log</button>
	</p>
	
	<p>
	Want to report a bug or request a feature? <a href="https://github.com/RedDragonWebDesign/skype-copy-paste-formatter/issues">Create an issue</a> on our GitHub.
	</p>
	
	<p>
	Like the tool? <a href="https://github.com/RedDragonWebDesign/skype-copy-paste-formatter">Leave us a star</a> on GitHub.
	</p>
</body>

</html>