const rng = require('number-generator/lib/aleaRNGFactory')();

const prefix = 'Upper Lower West South North Middle East New Outer Inner'.split(/\s+/);
const first = (`Wiggle Dunn Surry Eccle Bets High Hurst
    Water Tree Beacon Fire Mill
    Brecken Firth New Ari Eber Bray Wart 
    Turtle Badger Hare Lions Duck Dog Eagle
    Kate Mary Ellens Gladys Edith Marys
    Morgan Gordon Richard Stephen Kim Kyle Johns Williams Hughs Rich
    Hard Fins Gills Fitz Gold Glad Berwick Fingle Hicks Arrow
    Pebble Fitch Litch Ditch Cockle Watts`).split(/\s+/)//.slice(51);
const middle = 'ing worth o'.split(/\s+/);
const last = `wood bridge cross stone worth mont ridge bury ville rock town pond smith dale vale kin rick stein bourne field 
    acres worthy wick wich dock water view fields borough cock fish shire ton son side glen burn castle`.split(/\s+/)//.slice(36);
const suffix = `Heights Park Orchards Forest Downs Creek Valley Glen Hill`.split(/\s+/)//.slice(7); 

function multiReplace(s, pairs) {
    pairs.forEach(([find, replace]) => s = s.replace(new RegExp(find, 'g'), replace));
    return s;
}
module.exports = function fakeName(options = {}) {
    const rnd = () => rng.uFloat32();
    if (options.seed) {
        rng.setSeed(options.seed);
    }
    function pick(list) {
        return list[Math.floor(rnd() * list.length)];

    }
    const parts = [(rnd() > 0.7 ? pick(prefix) + ' ' : ''),
        pick(first), 
        (rnd() > 1 ? pick(middle) : ''), 
        pick(last),
        (rnd() > 0.8  ? ' ' + pick(suffix) : '')];

    return multiReplace(parts.join('|'), [
        [/\|\|+/,'|'],
        [/([dstrkw]|st)\|\1/, '$1'],
        // [/st\|st/, 'st'],
        [/ck\|c/, 'c'],
        [/\|/,'']

    ]);
}