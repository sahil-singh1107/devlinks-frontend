import github from "../public/images/icon-github.svg"
import youtube from "../public/images/icon-youtube.svg"
import facebook from "../public/images/icon-facebook.svg"
import freecodecamp from "../public/images/icon-freecodecamp.svg"
import gitlab from "../public/images/icon-gitlab.svg"
import codepen from "../public/images/icon-codepen.svg"
import codewars from "../public/images/icon-codewars.svg"
import devto from "../public/images/icon-devto.svg"
import frontendmentor from "../public/images/icon-frontend-mentor.svg"
import hashnode from "../public/images/icon-hashnode.svg"

const options = [
    {
        name: "GitHub",
        imageUrl: github
    },
    {
        name: "Youtube",
        imageUrl: youtube
    },
    {
        name: "Facebook",
        imageUrl: facebook
    },
    {
        name: 'Freecodecamp',
        imageUrl: freecodecamp
    },
    {
        name: "GitLab",
        imageUrl: gitlab
    },
    {
        name: "Devto",
        imageUrl: devto
    },
    {
        name: "FrontendMentor",
        imageUrl: frontendmentor
    },
    {
        name: "Codepen",
        imageUrl: codepen
    },
    {
        name: "Codewars",
        imageUrl: codewars
    },
    {
        name: "Hashnode",
        imageUrl: hashnode
    }
]

function imageSrc(platform) {
    const option = options.find(element => element.name === platform);
    return option ? option.imageUrl : null; // Return null if not found
}

export default imageSrc