// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // display the current date in the header of the page
    $('#currentDay').text(dayjs());

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    // apply the past, present, or future class to each time block, grab text content (from local storage, this is done by loadTimeBlocks() in data.js),
    function displayTimeBlocks() {
        let timeBlocksArray = loadTimeBlocks();
        $('.container-fluid').empty(); // clear any time blocks from the container
        timeBlocksArray.forEach((timeBlock) => {

            let stage = '';
            let currentHour = dayjs().hour();
            let timeBlockHour = timeBlock.getHour();

            (currentHour > timeBlockHour) ? stage = 'past' // if the current hour is greater than the timeBlock, the timeBlock is in the past, e.g. 10 > 9
                : (currentHour < timeBlockHour) ? stage = 'future' // else: less than its in the future, 9 < 10
                : stage = 'present'; // else: currentHour === timeBlockHour

            let element = `
            <div id="${timeBlock.getID()}" class="row time-block ${stage}">
                <div class="col-2 col-md-1 hour text-center py-3">${timeBlock.getHour()}:00</div>
                <textarea class="col-8 col-md-10 description" rows="3">${timeBlock.getTextContent()}</textarea>
                <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                </button>
            </div>`;
            $('.container-fluid').append(element);
        });
    }
    displayTimeBlocks();
    setInterval(displayTimeBlocks, 30000); // update time blocks every thirty seconds

});