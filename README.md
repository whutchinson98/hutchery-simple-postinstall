# Hutchery Simple PostIntall

## Description

A simple and quick to setup sub-module dependency installer

## Usage

In your npm script add a `"postinstall"` script and enter the command to run the index.js in this package

Example script:
`"postinstall":"node ./node_modules/hutchery-simple-postinstall/lib/index.js --subModuleList folderA,folderB,folderC --subModulePath subProjects"`

### Flags

Example File Structure:

/project

---/subProjects

------/folderA

------/folderB

------/folderC

| Name          | Description                                                        | Example                                 | Default Value | Required |
| ------------- | ------------------------------------------------------------------ | --------------------------------------- | ------------- | -------- |
| subModuleList | A comma delimted list of the sub modules for your project          | --subModuleList folderA,folderB,folderC | NONE          | YES      |
| subModulePath | The relative path to the root of your sub module folders           | --subModulePath subProjects             | src           | NO       |
| useInstall    | A boolean flag to say you want to use npm install intead of npm ci | --useInstall                            | FALSE         | NO       |
