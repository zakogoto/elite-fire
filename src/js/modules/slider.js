function slider({wrapper, sliderBody, prevBtn, nextBtn, field, slide, indicators}) {

    const slider = document.querySelector(sliderBody),
          sliderWrapper = slider.querySelector(wrapper),
          prev = slider.querySelector(prevBtn),
          next = slider.querySelector(nextBtn),
          sliderField = sliderWrapper.querySelector(field),
          slides = sliderWrapper.querySelectorAll(slide),
          width = window.getComputedStyle(sliderWrapper).width,
          dots = [];

    let slideIndex = 1,
        offset = 0;
    
    sliderField.style.display = 'flex';
    sliderField.style.width = 100 * slides.length + '%';
    sliderField.style.transition = '0.6s all';
    sliderWrapper.style.overflow = 'hidden';
    slides.forEach(slide => slide.style.width = width);

    function deleteNotDigits (str) {
        return +str.replace(/\D/gi, '');
    }
    
    if(indicators) {
        const indicator = document.createElement('ul');
        indicator.classList.add('slider_small__dots');
        slider.append(indicator);

        for (let i = 0; i < slides.length; i++) {
            let dot = document.createElement('li');
            dot.classList.add('slider_small__dot');
            dot.setAttribute('data-slide-to', i + 1);
            
            if (i == 0) {
                dot.classList.add('slider_small__dot_current');
            }
            
            indicator.append(dot);
            dots.push(dot);
        };
    }



    function slideSwitch (target) {
        sliderField.style.transform = `translateX(-${offset}px)`;

        if (target === prev) {
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
        }
        if (target === next) {
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
        }

        dots.forEach(dot => dot.classList.remove('slider_small__dot_current'));
        dots[slideIndex - 1].classList.toggle('slider_small__dot_current');
    }

    next.addEventListener('click', ()=> {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slideSwitch(next);
    });

    prev.addEventListener('click', ()=> {

        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slideSwitch(prev);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e)=> {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);

            slideSwitch();
        });
    });
};

export default slider;