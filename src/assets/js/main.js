    var detailsElements = document.querySelectorAll('.accordion_details');
    
    detailsElements.forEach((detail) => {
      detail.addEventListener('toggle', function () {
        if (detail["open"]) {
          detailsElements.forEach((otherDetail) => {
            if (otherDetail !== detail) {
                otherDetail.removeAttribute('open');
            }
          });
        }
        
        updateIcons();
      });
    });

    function updateIcons() {
      var summaryAfterElements = document.querySelectorAll('.summary_after');
      detailsElements.forEach((element, index) => {
        if (element["open"]) {
          summaryAfterElements[index].classList.add('open');
        } else {
          summaryAfterElements[index].classList.remove('open');
        }
      });
    }

    updateIcons(); // Initial call to set the correct icons on page load
