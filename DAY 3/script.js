function calculateGrade(score) {
if (score >= 90) {
return "A";
} else if (score >= 80) {
return "B";
} else if (score >= 70) {
return "C";
} else if (score >= 60) {
return "D";
} else {
return "F";
}
}

console.log("Score 97:", calculateGrade(97)); 
console.log("Score 89:", calculateGrade(89));
console.log("Score 73:", calculateGrade(73));