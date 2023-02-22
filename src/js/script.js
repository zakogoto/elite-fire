'use strict';

window.addEventListener('DOMContentLoaded', ()=> {
    //sliders
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
    }

    const sliders = [
        {
            wrapper:'.slider__wrap',
            sliderBody: '.slider_size',
            prevBtn: '.prev', 
            nextBtn: '.next',
            field: '.slider__inner',
            slide: '.slider__slide'
        },
        {
            wrapper:'.slider__wrap',
            sliderBody: '.slider_accessories',
            prevBtn: '.prev', 
            nextBtn: '.next',
            field: '.slider__inner',
            slide: '.slider__slide'
        },
        {
            wrapper:'.slider__wrap',
            sliderBody: '.slider_prepared',
            prevBtn: '.prev', 
            nextBtn: '.next',
            field: '.slider__inner',
            slide: '.slider__slide'
        },
        {
            wrapper:'.slider_small__wrap',
            sliderBody: '.slider_small',
            prevBtn: '.prev.prev_small', 
            nextBtn: '.next.next_small',
            field: '.slider_small__inner',
            slide: '.slider_small__slide',
            indicators: true
        }

    ]

    for(let i = 0; i < sliders.length; i++) {
        slider(sliders[i]);
    };

    // toddler
    
    class Toddler {
    constructor({ slider, toddler, filledBar }) {
        this.slider = document.querySelector(slider)
        this.toddler = document.querySelector(toddler)
        this.filledBar = document.querySelector(filledBar)
    
        this.toddler.addEventListener('mousedown', this.onMouseDown.bind(this))
        document.addEventListener('mousemove', this.onMouseMove.bind(this))
        document.addEventListener('mouseup', this.onMouseUp.bind(this))
    
    }
    
    onMouseDown = (e) => {
        e.preventDefault()
        this.isMouseDown = true
        this.toddlerCoords = this.getCoords.call(this, this.toddler)
        this.shiftX = e.pageX - this.toddlerCoords.left
    }
    
    onMouseMove = (e) => {
        
    
        if (this.isMouseDown) {
        this.sliderCoords = this.getCoords.call(this, this.slider)
        this.newLeft = e.pageX - this.shiftX - this.sliderCoords.left
    
        if (this.newLeft < 0) this.newLeft = 0
        let rightSide = this.slider.clientWidth - this.toddler.offsetWidth
        if (this.newLeft > rightSide) this.newLeft = rightSide
    
        this.toddler.style.left = this.newLeft + 'px'
        this.filledBar.style.width = this.newLeft + this.toddler.style.width + 'px'
        }
    }
    
    onMouseUp = () => {
        this.isMouseDown = false
    }
    
    getCoords = (elem) => {
        let box = elem.getBoundingClientRect()
        return {
        left: box.left,
        top: box.top + pageYOffset
        }
    }
    
    }
          
    new Toddler({
        slider: '.toddler__bar',
        toddler: '.toddler__block',
        filledBar: '.toddler__bar_colored'
    })
})