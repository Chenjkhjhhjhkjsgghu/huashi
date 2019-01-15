// ******************************************************************
//	
//    Random Password Generator (with Rule Validator)
//    Copyright (C) 2012 Elmo Recio
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see: 
//    <http://www.gnu.org/licenses/gpl-3.0.html>. 
//
//
// How to use:
//	configure your ruleset below, and use the function mkPasswd();
//	It will return your randomized password as per your rules.
//
//	Please NOTE: There are no quotes around the variables to edit.
//
// We want min 2 lower, 2 upper, and 2 number
// max repeated 2
//
// 

var ruleSet = {
	maxRepeat:	2,
	minChars:	12,
	maxChars:	12,
	minUpper:	2,
	minLower:	2,
	minNums:	2,
	minSpecials:0
};

var charSet = {
	// For special character set, don't use backslashes, quotes, or backticks
	specials:	"",
	nums:		"0123456789",
	uppers:		"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lowers:		"abcdefghijklmnopqrstuvwxyz",
	wholeSet:	""
};

// Not really used in this case. sPerhaps you might want to randomly
// select from this and append to the password that passes??
charSet.wholeSet =	charSet.specials + charSet.nums + charSet.uppers + charSet.lowers;

// End user configurable part.
// *******************************************************************

function mkPasswd(mRuleSet, mCharSet) {
	// Returns your random password as per your rules.
	
	// To randomize the order of pools as they appear, we loop through
	// to populate the intermediate password. Each time we check if it's
	// valid. If the password is valid, then we break out and we have
	// our final password. For extra randomness, I added another case
	// which just continues the loop;

	var passwd = "";
	
	while (!isValid(passwd, mRuleSet, mCharSet)) {
		// check to see if we've reached our max # of characters,
		// if so, we didn't generate any valid passwords this go
		// round. Blank it out and start over.
		if (passwd.length == mRuleSet.maxChars) { passwd=""; }	
		switch (pickRandom("0123")) {
			case "0":
				passwd += pickRandom(charSet.uppers);
				break;
			case "1":
				passwd += pickRandom(charSet.lowers);
				break;
			case "2":
				passwd += pickRandom(charSet.nums);
				break;
			case "3":
				passwd += pickRandom(charSet.specials);
			default:
				break;
		}
	}
	
	return passwd;
}

function pickRandom(charPool) {
	// Math.random() returns a long deciman between 0.0 and 1.0 so
	// if you have a pool of 15, when you multiply and round, you 
	// get the fraction of up to 15. The charPool.length is always 1+ 
	// than the actual array index, so subtract 1.
	//
	// i.e.: 16-1 == 15; random == 0.50; 15*0.50 == 7.5; rounded up to 8
	//       select the 8th character in your pool
	index = Math.round(Math.random()*(charPool.length - 1))
	return charPool.charAt(index);
}

function isValid(passwd, mRuleSet, mCharSet) {
	// This function, obviously does the checking. You can even break 
	// this function out into its own script, or use it directly
	// to validate user selected passwords based on the rules.
	
	// some sanity checking first
	if ( (passwd == null) || (passwd == "") ) { return false; }
	
	// before we even do anything complex, check the length
	if ( (mRuleSet.minChars > passwd.length) ||
		 (passwd.length > mRuleSet.maxChars) ) { 		  
		return false; 
	}
	
	// Now for the more complex stuff, first
	var passCount = false;
	var passRepeat = false;	

	// These are used to keep track of repeats.
	var repeatAr = new Array();	
	
	// These are used to keep track of minimum char requirements
	var upperCount    = 0;
	var lowerCount    = 0;
	var numsCount     = 0;
	var specialsCount = 0;
	for(i=0; i<passwd.length; i++) {
		c = passwd.charAt(i)
		if (mCharSet.uppers.indexOf(c) != "-1") {
			upperCount++;
		}
		if (mCharSet.lowers.indexOf(c) != "-1") {
			lowerCount++;
		}
		if (mCharSet.nums.indexOf(c) != "-1") {
			numsCount++;
		}
		if (mCharSet.specials.indexOf(c) != "-1") {
			specialsCount++;
		}
		// while in this loop pack the repeat array too.
		// break into two functions	
		repeatAr[c.charCodeAt(0)] = c;		
	}
	
	passCount = (lowerCount    >= mRuleSet.minLower) && 
				(upperCount    >= mRuleSet.minUpper) &&
				(numsCount     >= mRuleSet.minNums)  &&
				(specialsCount >= mRuleSet.minSpecials);
					
	// To check repeats, use the charcode as an index, so that same values,
	// overwrite eachother. Convert the array to a string by join()ing them
	// with nulls. Get the resulting string length. If the length of that
	// string is more than maxRepeat'ed characters LESS than the length
	// of the password, then they repeated too many chars.
	//
	// The max repeats will also pick up min uniques of any value.
	
	var repeatsRemoved = repeatAr.join("");
	passRepeat = ( (passwd.length - repeatsRemoved.length) <= mRuleSet.maxRepeat );
	
	return (passCount && passRepeat);

}
