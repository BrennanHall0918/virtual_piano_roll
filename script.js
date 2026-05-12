// Selecting All Notes
const notes = document.querySelector("[data-note]");

// Lookup table for the event listener
const noteTable = {
    z: {
        note: "C4",
        frequency: 261.63,
        active: false
    },
    s: {
        note: "C#4",
        frequency: 277.18,
        active: false
    },
    x: {
        note: "D4",
        frequency: 293.66,
        active: false
    },
    d: {
        note: "D#4",
        frequency: 311.13,
        active: false
    },
    c: {
        note: "E4",
        frequency: 329.63,
        active: false
    },
    v: {
        note: "F4",
        frequency: 349.23,
        active: false
    },
    g: {
        note: "F#4",
        frequency: 369.99,
        active: false
    },
    b: {
        note: "G4",
        frequency: 392,
        active: false
    },
    h: {
        note: "G#4",
        frequency: 415.30,
        active: false
    },
    n: {
        note: "A4",
        frequency: 440,
        active: false
    },
    j: {
        note: "A#4",
        frequency: 466.16,
        active: false
    },
    m: {
        note: "B4",
        frequency: 493.88,
        active: false
    },
    q: {
        note: "C5",
        frequency: 523.25,
        active: false
    },
    2: {
        note: "C#5",
        frequency: 554.37,
        active: false
    },
    w: {
        note: "D5",
        frequency: 587.33,
        active: false
    },
    3: {
        note: "D#5",
        frequency: 622.25,
        active: false
    },
    e: {
        note: "E5",
        frequency: 659.25,
        active: false
    },
    r: {
        note: "F5",
        frequency: 698.46,
        active: false
    },
    5: {
        note: "F#5",
        frequency: 739.99,
        active: false
    },
    t: {
        note: "G5",
        frequency: 783.99,
        active: false
    },
    6: {
        note: "G#5",
        frequency: 830.61,
        active: false
    },
    y: {
        note: "A5",
        frequency: 880,
        active: false
    },
    7: {
        note: "A#5",
        frequency: 932.33,
        active: false
    },
    u: {
        note: "B5",
        frequency: 987.77,
        active: false
    }
};

const audioContext = new AudioContext();
// Contains a list of every currently active note
const activeOscillators = {};

// Listens for a keypress
document.addEventListener("keydown", (event)=> {

    // Stores the key that was pressed
    const key = event.key.toLowerCase();

    // Look up the note via the key
    const noteData = noteTable[key];

    // If key doesn't exist, stop
    if (!noteData) return;
    
    // If note is already playing, stop
    if (noteData.active) return;

    // Mark note as active
    noteData.active = true;

    // Play the note
    playNote(noteData);
})

// Listens for a key being lifted
document.addEventListener("keyup", (event)=> {

    // Stores the key that is no longer being pressed
    const key = event.key.toLowerCase();

    // pulls all note data for that note
    const noteData = noteTable[key];

    // If note doesn't exist, stop
    if (!noteData) return;

    // Stop the note
    stopNote(noteData);
})

// Generates a tone based on the frequency of the selected note
function playNote(noteData) {

    // Making the oscillator (generates the note) and the gainNode (volume)
    const oscillator = audioContext.createOscillator();
    oscillator.type = "square";
    const gainNode = audioContext.createGain();
    
    // connecting the oscillator and gain together
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Setting the frequency of the oscillator to the frequency from the table
    oscillator.frequency.value = noteData.frequency;
    
    // Setting the volume to 0.2
    // Note: Add a UI volume slider
    gainNode.gain.value = 0.2;

    // Starts the oscillator
    oscillator.start();

    // Stores the note in the object containing all active notes
    activeOscillators[noteData.note] = {
        oscillator,
        gainNode
    };
}

// Stops the note once the key is lifted
function stopNote(noteData) {

    // Checks if the note is in the object of active notes
    const activeNote = activeOscillators[noteData.note];
    if (!activeNote) return;

    // Stops the note
    // Note: Add a gradual stop as apposed to this immediate one
    activeNote.oscillator.stop();

    // Removes the note from the list of active notes
    delete activeOscillators[noteData.note];

    // Sets the active flag to false
    noteData.active = false;
}