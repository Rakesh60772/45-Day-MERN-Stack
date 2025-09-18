const skills = [
  { name: "HTML", proficiency: "Intermediate", experienceYears: 3, category: "Frontend" },
  { name: "CSS", proficiency: "Advanced", experienceYears: 4, category: "Frontend" },
  { name: "JavaScript", proficiency: "Beginner", experienceYears: 1, category: "Frontend" },
  { name: "Node.js", proficiency: "Advanced", experienceYears: 5, category: "Backend" },
  { name: "MongoDB", proficiency: "Intermediate", experienceYears: 2, category: "Backend" }
];

function formatSkills(skillsArray) {
  return skillsArray.map(skill => `${skill.name} (${skill.proficiency})`);
}

const formattedSkills = formatSkills(skills);
console.log(formattedSkills);

function Advanced(skillsA) {
  return skillsA.filter(skill => skill.proficiency === "Advanced");
}

const advProf = Advanced(skills);
console.log(advProf);

const sortedAdvancedSkills = skills.sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedAdvancedSkills);

function groupSkills(skills) {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
}

const groupedByCategory = groupSkills(sortedAdvancedSkills);

for (const category in groupedByCategory) {
  console.log(`\n${category} Skills:`);
  groupedByCategory[category].forEach(skill => {
    console.log(`- ${skill.name} (${skill.proficiency}, ${skill.experienceYears} yrs)`);
  });
}