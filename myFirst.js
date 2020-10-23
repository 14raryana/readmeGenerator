var http = require("https");
var date = require("./myFirstModule");
var fs = require("fs");
const inquirer = require("inquirer");
const { type } = require("os");

var questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project"
    },
    {
        type: "input",
        name: "description",
        message: "Give a description of your program"
    },

    {
        type: "input",
        name: "username",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    },
    {
        type: "input",
        name: "installation",
        message: "Give any installation instructions for your program"
    },
    {
        type: "input",
        name: "usage",
        message: "Give any usage instructions that you have for your program"
    },
    {
        type: "input",
        name: "contributing",
        message: "List any collaborators for this project"
    },
    {
        type: "input",
        name: "tests",
        message: "Give any testing instructions for your program"
    },
    {
        type: "input",
        name: "gitHubProjectName",
        message: "What is the name of your project on gitHub you would like to link this to?"
    },
    {
        type: "checkbox",
        name: "license",
        message: "Pick what license(s) your project has",
        choices: [" afl-3.0 (Academic Free License v3.0)"," apache-2.0 (Apache License 2.0)"," artistic-2.0 (Artistic License2.0)"," bsl-1.0 (Boost Software License)",
        " bsd-2-clause (BSD 3-clause Clear License)", " bsd-3-clause (BSD 3-clause 'New' or 'Revised' License)", " bsd-3-clause-clear (BSD 3-clause Clear license)",
        " cc (Creative Commons License Family)", " cc0-1.0 (Creative Commons Zero v1.0 Universal)", " cc-by-4.0 (Creative Commons Attribution 4.0)", " cc-by-sa-4.0 (Creative Commons Attribution Share Alike 4.0)",
        " wtfpl (Do What the Fuck You Want To Public License)", " ecl-2.0 (Educational Community License v2.0)", " epl-1.0 (Eclipse Public License 1.0)", " epl-2.0 (Eclipse Public License 2.0)", " eupl-1.1 (European Union Public License 1.1)",
        " agpl-3.0 (GNU Affero General Public License v3.0)", " gpl (GNU General Public License Family)", " gpl-2.0 (GNU General Public License v2.0)", " gpl-3.0 (GNU General Public License v3.0)", " lgpl (GNU Lesser General Public License Family)",
        " lgpl-2.1 (GNU Lesser General Public License v2.1)", " lgpl-3.0 (GNU Lesser General Public License v3.0)", " isc (ISC)", " lppl-1.3c (LaTeX Project Public License v1.3c)", " ms-pl (Microsoft Public License)", " mit (MIT)", " mpl-2.0 (Mozilla Public License 2.0)",
        " osl-3.0 (Open Software License 3.0)", " postgresql (PostgreSQL License)", " ofl-1.1 (SIL Open Font License 1.1)", " ncsa (University of Illinois/NCSA Open Source License)", " unlicense (The Unlicense)", " zlib (zLib License)"]
    }
];


function init() {
    inquirer.prompt(questions).then(function(response){

        writeFileFunction();
        updateFile(response);
        // console.log(response);
    });
}
init();

function writeFileFunction(){
    fs.writeFile("randomFile.md","",function(err){
        if(err) return console.log(err);

        console.log("File Saved");
    });
}

function updateFile(response) {

    var projectUrl = "https://github.com/"+response.username+"/"+response.gitHubProjectName;
    var gitHubUrl = "https://github.com/" + response.username + "?tab=repositories";

    if(!response.username) {
        gitHubUrl = "No Information Given";
        projectUrl = "No Information Given";
    }
    if(!response.gitHubProjectName) {
        projectUrl = "No Information Given";
    }
    
    var line = "\n\n## Description" + "\n"+(response.description || "No Information Given") + "\n\n## Installation" + "\n"+(response.installation || "No Information Given") +"\n\n## Usage"+"\n"+(response.usage || "No Information Given") + 
    "\n\n## License"+"\n"+(response.license ||"No Information Given") + "\n\n## Contributing"+"\n"+(response.contributing || "No Information Given") + "\n\n## Tests"+"\n"+(response.tests || "No Information Given") + 
    "\n\n## Questions"+ "\n"+"github repository link: " + gitHubUrl + "\n"+ "project link: " + projectUrl;

    fs.appendFileSync("randomFile.md", "# " + (response.title || "No Information Given"));

    fs.appendFileSync("randomFile.md", "\n\n## Table of Contents"+"\n1. [Description](#description)"+"\n2. [Installation](#installation)" +"\n3. [Usage](#usage)"+"\n4. [License](#license)" + "\n5. [Contributing](#contributing)" + "\n6. [Tests](#tests)" +"\n7. [Questions](#questions)");

    fs.appendFileSync("randomFile.md",line,function(err){
        if(err) return console.log(err);
        console.log("File Saved");
    });
}


// http.createServer(function(req, res){
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.end("Hello World!");
// }).listen(8080);