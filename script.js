import data from './timeline.json' with {type: 'json'};

console.log(data);

let timeline = data["timeline"];
for (let i = 0; i < timeline.length; i++) {
    console.log(timeline[i]);
}
