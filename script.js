import data from './timeline.json' with {type: 'json'};

let timeline = data["timeline"]; // 
let timeline_element = document.querySelector(".timeline-container");

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