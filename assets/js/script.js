$(function () {
    // display the current date in the header of the page
    $('#currentDay').text(Date());
    setInterval(() => {
        $('#currentDay').text(Date());
    }, 1000);

    // on save button click, display feedback to user and save the textarea's value to local storage
    $('.container-fluid').on('click', '.saveBtn', (event) => {
        let currentTarget = event.currentTarget;
        // feedback display
        $(currentTarget).html('Saved!');
        setTimeout(() => { // reset after half a second
            $(currentTarget).html('<i class="fas fa-save" aria-hidden="true"></i>');
        }, 500);
        // get the parents id (also the local storage key), save value of textContent
        let id = $(currentTarget).parent().attr('id');
        let textContent = $(currentTarget).siblings('textarea').val();
        localStorage.setItem(id, textContent);
    });

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
    // currently time blocks are only updated when the page is refreshed, could set a timeout/interval for live refreshing 
    // setInterval(displayTimeBlocks, 300000); // update time blocks every five minutes
});