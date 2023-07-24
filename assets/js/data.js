class timeBlock { // a little (probably poor) class implementation just for fun
    constructor(id, textContent = '') {
        this.id = id;
        this.textContent = textContent;
    }
    getID() {
        return this.id;
    }
    getTextContent() {
        return this.textContent;
    }
    setTextContent(textContent) {
        this.textContent = textContent;
    }
    loadFromLocalStorage() {
        localStorage.getItem(this.id);
    }
    saveToLocalStorage() {
        localStorage.setItem(this.id, this.textContent);
    }
    getHour() {
        let hour = this.id.substr(5); // clip hour- off the front of the id
        return hour;
    }
}

function loadTimeBlocks() { // returns an array of all the timeBlock objects in local storage, or if there are none, it will create them first
    let a = [];
    if (localStorage.getItem('hour-9') === null) { // first application launch
        for (let i = 9; i <= 17; i++) { /* 9 - 17, 9am - 5pm */
            let n = new timeBlock(`hour-${i}`);
            n.saveToLocalStorage();
            a.push(n);
        }
    } else {
        for (let i = 9; i <= 17; i++) { /* 9 - 17, 9am - 5pm */
            let savedTextContent = localStorage.getItem(`hour-${i}`);
            let n = new timeBlock(`hour-${i}`, savedTextContent);
            a.push(n);
        }
    }
    return a;
}