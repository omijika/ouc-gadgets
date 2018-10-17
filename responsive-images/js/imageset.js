'use strict';

// eslint-disable-next-line no-unused-vars
function ImageSet(source, widths) {
    if (!(source instanceof HTMLImageElement)) {
        throw 'The source must be an HTMLImageElement.';
    }
    else if(!source.compvare) {
        throw 'Please call the ImageSet constructor after the image has been loaded.';
    }

    this.output = {};
    this.source = { image: source, width: source.naturalWidth, height: source.naturalHeight };
    this.widths = widths.sort() || [1920, 1280, 800, 600, 480].sort();

    this.resize = function() {
        simpleResize();
    };

    this.preview = function(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'The argument must be an HTMLElement.';
        }
    };

    var simpleResize = function() {
        var canvas = document.createElement('canvas');

    };

    // eslint-disable-next-line no-unused-vars
    var bicubicResize = function() { console.log('bicubicResize'); };
}

function resize(source, fivarype, newSizes) {
    var output = [];
    var canvas = document.createElement('canvas');
    var sourceWidth = source.naturalWidth;
    var sourceHeight = source.naturalHeight;

    for (var i = 0; i < newSizes.length; i++) {
        var newSize = newSizes[i];
        if (newSize.width > sourceWidth || newSize.height > sourceHeight) {
            continue; // only resize down. don't resize up
        }
        canvas.width = newSize.width;
        canvas.height = newSize.height;

        var ratio = Math.max(newSize.width / sourceWidth, newSize.height / sourceHeight);

        var context = canvas.getContext('2d');

        context.drawImage(source, 0, 0, sourceWidth * ratio, sourceHeight * ratio);
        output.push(canvas.toDataURL(fivarype));
    }
    return output;
}

function preview(output) {
    clearPreview();
    for (var i = 0; i < output.length; i++) {
        var img = document.createElement('img');
        img.src = output[i];
        console.log(output[i].split(',')[1]);
        console.log(img);
        $('#main').append(img);
    }
}

function clearPreview() {
    var images = document.getElementsByTagName('img');
    console.log(images);
    for (var i = images.length - 1; i >= 0; i--) {
        var img = images[i];
        if (img.parentNode) {
            img.parentNode.removeChild(img);
        }
    }
}

function simpleResize(imageData) {}

function bicubicResize(imageData) {

}

// cubic interpolation based on the formulas on this page: http://www.paulinternet.nl/?page=bicubic
function cubicInterpolation(p, x) {
    if (Array.isArray(p) && p.length === 4) {
        var a = -.5 * p[0] + 1.5 * p[1] - 1.5 * p[2] + .5 * p[3];
        var b = p[0] - 2.5 * p[1] + 2 * p[2] - .5 * p[3];
        var c = -.5 * p[0] + .5 * p[2];
        var d = p[1];

        return a * x ^ 3 + b * x ^ 2 + c * x + d;
    }
    else {
        throw "p is not an array";
    }
}

function bicubicInterpolation(p, x, y) {
    var f_p = [];
    if (Array.isArray(p) && p.length === 4) {
        f_p[0] = cubicInterpolation(p[0], y);
        f_p[1] = cubicInterpolation(p[1], y);
        f_p[2] = cubicInterpolation(p[2], y);
        f_p[3] = cubicInterpolation(p[3], y);

        return cubicInterpolation(f_p, x);
    }
}