// Type this into console: yarn test
// Tutorial: https://jestjs.io/docs/en/getting-started

const SkypeCopyPasteFormatter = require('./skype-copy-paste-formatter');

test('General test', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`I'm getting ready to consider 2k (not 4k) for a main monitor 

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

And it stresses out the VC more than 1080p or 2k`,
'Jeff22',
'Bob44'
	)).toBe(
`[[Bob44]] I'm getting ready to consider 2k (not 4k) for a main monitor
[[Bob44]] But, I don't want to spend too much
[[Jeff22]] Have you tried out 2k? Is it noticeably better?
[[Bob44]] I have not.
[[Bob44]] But its gonna be awhile before 4k
[[Bob44]] Cause gaming still not there
[[Jeff22]] Yeah. Gpus are getting good, but increasing res and hz brings them back down to mediocre
[[Bob44]] Yeah, but 4k can't even have 144hz yet
[[Bob44]] And it stresses out the VC more than 1080p or 2k`
	);
});



test('No usernames', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`Haha no worries
Yeah 3rd monitor, gaming specs would prob be overkill
Just need to drag some windows on it when I'm multitasking for work`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] Haha no worries
[[Jeff22]] Yeah 3rd monitor, gaming specs would prob be overkill
[[Jeff22]] Just need to drag some windows on it when I'm multitasking for work`
	);
});



test('1 timestamp, 0 usernames', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`7:11 PM
Haha no worries
Yeah 3rd monitor, gaming specs would prob be overkill
Just need to drag some windows on it when I'm multitasking for work`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] Haha no worries
[[Jeff22]] Yeah 3rd monitor, gaming specs would prob be overkill
[[Jeff22]] Just need to drag some windows on it when I'm multitasking for work`
	);
});



test('1 username, 2 timestamps, line breaks', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`Bob44, 7:24 PM
I'm getting ready to consider 2k (not 4k) for a main monitor 

But, I don't want to spend too much

7:27 PM
Have you tried out 2k? Is it noticeably better?`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Bob44]] I'm getting ready to consider 2k (not 4k) for a main monitor
[[Bob44]] But, I don't want to spend too much
[[Jeff22]] Have you tried out 2k? Is it noticeably better?`
	);
});



test('Blank "Line 1 Username" - should result in [[???]]', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`I'm getting ready to consider 2k (not 4k) for a main monitor 

But, I don't want to spend too much

7:27 PM
Have you tried out 2k? Is it noticeably better?

Bob44, 7:27 PM
I have not.

But its gonna be awhile before 4k

Cause gaming still not there`,
'Jeff22',
''
	)).toBe(
`[[???]] I'm getting ready to consider 2k (not 4k) for a main monitor
[[???]] But, I don't want to spend too much
[[Jeff22]] Have you tried out 2k? Is it noticeably better?
[[Bob44]] I have not.
[[Bob44]] But its gonna be awhile before 4k
[[Bob44]] Cause gaming still not there`
	);
});



test("Already formatted (don't double format)", () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`[[Bob44]] I'm getting ready to consider 2k (not 4k) for a main monitor 
[[Bob44]] But, I don't want to spend too much
[[Jeff22]] Have you tried out 2k? Is it noticeably better?
[[Bob44]] I have not.
[[Bob44]] But its gonna be awhile before 4k
[[Bob44]] Cause gaming still not there
[[Jeff22]] Yeah. Gpus are getting good, but increasing res and hz brings them back down to mediocre
[[Bob44]] Yeah, but 4k can't even have 144hz yet
[[Bob44]] And it stresses out the VC more than 1080p or 2k`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Bob44]] I'm getting ready to consider 2k (not 4k) for a main monitor 
[[Bob44]] But, I don't want to spend too much
[[Jeff22]] Have you tried out 2k? Is it noticeably better?
[[Bob44]] I have not.
[[Bob44]] But its gonna be awhile before 4k
[[Bob44]] Cause gaming still not there
[[Jeff22]] Yeah. Gpus are getting good, but increasing res and hz brings them back down to mediocre
[[Bob44]] Yeah, but 4k can't even have 144hz yet
[[Bob44]] And it stresses out the VC more than 1080p or 2k`
	);
});



test('Blank "Line 1 Username" - should result in [[???]]', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`Line 1

Line 2


User1, 3:16 PM
Line 1

Line 2


User1, 4:02 PM
Line 1

Line 2

Line 1

Line 2

Line 1

Line 2

Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line 

4:21 PM
Line 1
Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line 
Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line 
Line 2
User1, 4:26 PM
Line 1

Line 2`,
'Jeff22',
''
	)).toBe(
`[[???]] Line 1
[[???]] Line 2
[[User1]] Line 1
[[User1]] Line 2
[[User1]] Line 1
[[User1]] Line 2
[[User1]] Line 1
[[User1]] Line 2
[[User1]] Line 1
[[User1]] Line 2
[[User1]] Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line
[[Jeff22]] Line 1
[[Jeff22]] Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line
[[Jeff22]] Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line Long Line
[[Jeff22]] Line 2
[[User1]] Line 1
[[User1]] Line 2`
	);
});



test('Trim test (1 space at end of every line)', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`Testing 123 
Testing 123 `,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] Testing 123
[[Jeff22]] Testing 123`
	);
});



test('Fix line breaks', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`Testing.Hello, how are you?I'm good, you?I'm excellent!That's great to hear.
This is a test.
Of the emergency broadcast system.

I see.
Ok.`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] Testing.
[[Jeff22]] Hello, how are you?
[[Jeff22]] I'm good, you?
[[Jeff22]] I'm excellent!
[[Jeff22]] That's great to hear.
[[Jeff22]] This is a test.
[[Jeff22]] Of the emergency broadcast system.
[[Jeff22]] I see.
[[Jeff22]] Ok.`
	);
});



test('Fancy punctuation', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`'“': '"',
'”': '"',
'‘': '\'',
'’': '\'',
'¼': '1/4',
'½': '1/2',
'¾': '3/4',
'–': '-',
'—': '--',
'…': '...',`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] '"': '"',
[[Jeff22]] '"': '"',
[[Jeff22]] ''': '\'',
[[Jeff22]] ''': '\'',
[[Jeff22]] '1/4': '1/4',
[[Jeff22]] '1/2': '1/2',
[[Jeff22]] '3/4': '3/4',
[[Jeff22]] '-': '-',
[[Jeff22]] '--': '--',
[[Jeff22]] '...': '...',`
	);
});



test('Double fancy punctuation', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`“““`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] """`
	);
});



test('0 usernames, line breaks', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`Line 1

Line 2

Line 3`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] Line 1
[[Jeff22]] Line 2
[[Jeff22]] Line 3`
	);
});



test('For logs with no line breaks, handle username in middle of log correctly', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
`The word word word.They word word word.Username, 5:52 AMIf word word word. The word word word.The word word word. The word word word.The word word word.`,
'Jeff22',
'Jeff22'
	)).toBe(
`[[Jeff22]] The word word word.
[[Jeff22]] They word word word.
[[Username]] If word word word. The word word word.
[[Username]] The word word word. The word word word.
[[Username]] The word word word.`
	);
});



/* Template:

test('', () => {
	let scpf = new SkypeCopyPasteFormatter();
	expect(scpf.getFormattedText(
``,
'Jeff22',
'Jeff22'
	)).toBe(
``
	);
});
*/