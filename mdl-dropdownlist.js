// document.querySelector('.mdl-dropdownlist__label').addEventListener('click', function () {
// alert(123);
// });

document.addEventListener("DOMContentLoaded", function(event) {
    var dropdownLists = document.querySelectorAll('.mdl-dropdownlist');
    dropdownLists.forEach(function(dropdownList) {

        var optionsArray = dropdownList.querySelectorAll('.mdl-dropdownlist div')
        var parent = dropdownList.parentNode;
        var container = document.createElement("div");
        container.classList.add("mdl-dropdownlist__container");
        parent.appendChild(container);
        container.appendChild(dropdownList);

        var options = document.createElement("div");
        options.classList.add("mdl-dropdownlist__options");
        optionsArray.forEach(function(element) {
            element.classList.add("mdl-dropdownlist__option");
            options.append(element);
        })
        dropdownList.prepend(options);

        var outline = document.createElement("div");
        outline.classList.add("mdl-dropdownlist__outline");
        dropdownList.prepend(outline);

        var hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.classList.add("mdl-dropdownlist__hidden");
        dropdownList.prepend(hidden);

        var input = document.createElement("input");
        input.classList.add("mdl-dropdownlist__label");
        dropdownList.prepend(input);

        if (dropdownList.classList.contains("mdl-js-dropdownlist")) {
            dropdownList.querySelector('.mdl-dropdownlist__label').addEventListener('click', function() {
                this.parentNode.parentNode.classList.add("is-visible");
                var minWidth = this.offsetWidth;

                var outline_height = this.parentNode.querySelector('.mdl-dropdownlist__options').children.length * 32 + 16;
                var max_outline_width = this.parentNode.querySelector('.mdl-dropdownlist__options').children;
                var array = Array.from(this.parentNode.querySelector('.mdl-dropdownlist__options').children);
                var widthArray = array.map(function(elem) {
                    return elem.offsetWidth;
                });

                var max_outline_width = Math.max.apply(Math, widthArray);
                this.parentNode.querySelector('.mdl-dropdownlist__outline').style.height = outline_height + "px";
                this.parentNode.querySelector('.mdl-dropdownlist__outline').style.width = max_outline_width;
                this.parentNode.querySelector('.mdl-dropdownlist__outline').style.minWidth = minWidth;
            });

            dropdownList.querySelector('.mdl-dropdownlist__label').addEventListener('keyup', function(e) {
                if (e.keyCode === 13) {
                    var visible = document.querySelector('.mdl-dropdownlist__container.is-visible');
                    if (visible !== null) {
                        visible.classList.remove("is-visible");
                        dropdownList.querySelector('.mdl-dropdownlist__label').parentNode.querySelector('.mdl-dropdownlist__outline').style = null;
                    }
                }
            });

            var options = document.querySelectorAll('.mdl-dropdownlist__option');
            options.forEach(function(element) {
                element.addEventListener('click', function() {
                    var label = this.parentNode.parentNode.querySelector('.mdl-dropdownlist__label');
                    var hidden = this.parentNode.parentNode.querySelector('.mdl-dropdownlist__hidden');
                    label.value = this.outerText;
                    hidden.value = this.id;
                    this.parentNode.parentNode.parentNode.classList.remove("is-visible");
                    dropdownList.querySelector('.mdl-dropdownlist__label').parentNode.querySelector('.mdl-dropdownlist__outline').style = null;
                });
            })

            document.addEventListener('click', function(e) {
                if (e.target != input) {
                    var visible = dropdownList.parentNode.parentNode.querySelector('.mdl-dropdownlist__container.is-visible');
                    if (visible !== null) {
                        input.parentNode.querySelector('.mdl-dropdownlist__outline').style = null;
                        visible.classList.remove("is-visible");
                    }
                }
            });
        }
    })
});
