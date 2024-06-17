$(function () {
  // Display the current date in the header
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Generate time blocks for each hour from 9 AM to 5 PM
  const businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 24-hour format
  const container = $('#timeBlocks');
  const currentHour = dayjs().hour();

  businessHours.forEach(hour => {
    const hourText = dayjs().hour(hour).format('hA');
    const timeBlockClass = hour < currentHour ? 'past' : hour === currentHour ? 'present' : 'future';

    const timeBlock = $(`
      <div id="hour-${hour}" class="row time-block ${timeBlockClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${hourText}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `);

    // Append the time block to the container
    container.append(timeBlock);

    // Load saved events from localStorage
    const savedEvent = localStorage.getItem(`hour-${hour}`);
    if (savedEvent) {
      timeBlock.find('.description').val(savedEvent);
    }
  });

  // Save button click listener
  $('.saveBtn').on('click', function () {
    const timeBlock = $(this).closest('.time-block');
    const hourId = timeBlock.attr('id');
    const eventText = timeBlock.find('.description').val();

    // Save to localStorage
    localStorage.setItem(hourId, eventText);
  });
});