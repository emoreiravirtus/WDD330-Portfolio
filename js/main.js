const links = [ 1, 2, 3, 4 ]

for (link in links) {
    document.querySelector('body ol').innerHTML += `
        <li>
            <a href='week${parseInt(link) + 1}/index.html'>Week ${parseInt(link) + 1} Report</a>
        </li>`;
}
