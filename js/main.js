const links = [
    {
        label: "Week1 notes",
        url: "week1/index.html"
    }
]

for (link in links) {
    document.querySelector('body ol').innerHTML += `
        <li>
            <a href='${links[link].url}'>${links[link].label}</a>
        </li>`;
}
