import data from './timeline.json' with {type: 'json'};

const timeline = data["timeline"]; // 
const timeline_element = document.querySelector(".timeline-container");

function basic_timeline() {
    // populate timeline HTML with each of the JSON objects
    for (let i = 0; i < timeline.length; i++) {

        // make a new element for each entry
        let entry = document.createElement("div");
        entry.classList.add("timeline-entry");

        // fetch the header from JSON
        let header = document.createElement("h2");
        header.textContent = timeline[i].year;
        header.classList.add("timeline-year");

        // fetch the text content
        let content = document.createElement("div");
        content.textContent = timeline[i].content;
        content.classList.add("timeline-content");

        // add them to the entry
        entry.append(header);
        entry.append(content);

        // and add the entry to the timeline itself
        timeline_element.append(entry);
    }
}

//basic_timeline();

// this is fine and dandy and all but it's not very fancy. and it's not very different.
// what i want is to create an SVG path, segment it into timeline.length sections, and put circles on each of those points. when the user hovers over each circle, the corresponding entry will appear

function svg_timeline() {
    // create an SVG element to hold a path
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");

    // create a path
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("style", "fill:none;stroke:black;stroke-width:4");
    path.setAttribute("d", "M -55.091427714147 32.93482667420345 C 144.80113790883007 97.3739627535241, -63.952133266506024 143.62058439792494, 38.26398948256795 214.25147018169218 C 162.46181137734635 22.644965168521622, 274.9332664498524 358.1171925569978, 225.70283492497651 78.7704555568541");

    // add path to the svg element, then add the svg to the html
    svg.append(path);
    timeline_element.append(svg);

    // above is our finished path!    

    // calculate distance between markers
    const svg_length = document.querySelector("path").getTotalLength();
    const num_segments = timeline.length;
    const segment_length = svg_length / num_segments;
    let current_marker = 0;

    for (let i = 0; i <= svg_length; i+= segment_length) {
        // get the coords of each marker position
        const point = path.getPointAtLength(i);
        // and make it a circle
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // set its attributes
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", 5);
        circle.setAttribute("fill", "black");
        circle.setAttribute("style", "cursor:pointer;");
        circle.setAttribute("value", current_marker)
        circle.addEventListener("click", function() {handle_marker_click(circle.getAttribute("value"))});

        svg.append(circle);
        current_marker++; // for determining which point on the timeline we are looking at
    }
}

function handle_marker_click(current_marker) {
    const content = document.querySelector(".content");
    const header = document.createElement("h2");
    header.classList.add("timeline-year");
    header.textContent = timeline[current_marker].year;

    const text = document.createElement("div");
    text.classList.add("timeline-content");
    text.textContent = timeline[current_marker].content;

    while (content.childNodes.length >= 1) {
        content.removeChild(content.firstChild); // remove all child nodes
    }

    // add year and text
    content.append(header);
    content.append(text);
}

svg_timeline();

