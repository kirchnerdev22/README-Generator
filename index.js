const fs = require("fs")
const inquirer = require('inquirer');

const genREADME = ({title, description, installation, usage, contributions, tests, license, github, email, badge }) =>

`# ${title}
${badge}
## Description
${description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Tests](#tests)
- [License](#license)
## Installation
For this application to function properly, you need to install the following:
${installation}
## Usage
${usage}
## Contributions
${contributions}
## Tests
${tests}
## License
${license} License
## Questions
If you have any questions, or bug reports, contact me at Github: https://github.com/${github} or Email: ${email}
`

inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?",
            validate: (titleInput) => {
                if (titleInput){
                    return true;
                } else {
                    console.log("Please enter a title!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "description",
            message: "Please add a description of your project!",
            validate: (descriptionInput) => {
                if (descriptionInput){
                    return true;
                } else {
                    console.log("Please enter a valid description!");
                    return false;
                }
            },
        },
        {
            type: "installation",
            name: "installation",
            message: "What are the installation steps?",
            validate: (installationInput) => {
                if (installationInput){
                    return true;
                } else {
                    console.log("Please explain the installation process!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "usage",
            message: "Please enter your usage directions!",
            validate: (usageInput) => {
                if (usageInput){
                    return true;
                } else {
                    console.log("Please explain the proper usage!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "contributions",
            message: "How can other users contribute to the project?",
            validate: (contributionsInput) => {
                if (contributionsInput){
                    return true;
                } else {
                    console.log("Please explain how others can contribute!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "tests",
            message: "How is this project best tested?",
            validate: (testsInput) => {
                if (testsInput){
                    return true;
                } else {
                    console.log("Please tell how the project can be tested!");
                    return false;
                }
            },
        },
        {
            type: "list",
            name: "license",
            message: "What is your selected license for your project?",
            choices: [
                "Apache 2.0",
                "Boost",
                "GNU AGPL V3",
                "MIT",
                "Perl",
                "Other License",
            ],
            validate: (licenseInput) => {
                if (licenseInput){
                    return true;
                } else {
                    console.log("Please select a project license!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?",
            validate: (githubInput) => {
                if (githubInput){
                    return true;
                } else {
                    console.log("Please enter your Github username!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is your personal email?",
            validate: (emailInput) => {
                if (emailInput){
                    return true;
                } else {
                    console.log("Please enter your personal email!");
                    return false;
                }
            },
        },
    ])
    .then((answers) => {
        const badge = makeBadge(answers.license)
        const readmeContent = genREADME({...answers, badge});

        fs.writeFile("README.md", readmeContent, (err) => {
            err ? console.log(err) : console.log("Successfully made README!")
        })
    })

    function makeBadge(license){
        let badge = ""
        switch (license) {
            case "Apache 2.0":
                badge = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
                break;
            case "Boost":
                badge = `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
                break;
            case "GNU AGPL V3":
                badge = `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
                break;
            case "MIT":
                badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
                break;
            case "Perl":
                badge = `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`;
                break;
            default:
                badge = ""
        }

        return badge;
    }