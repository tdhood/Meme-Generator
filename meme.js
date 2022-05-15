"use strict";

let memes = [

];


function memeToDomElement(meme, idx) {
    let containerDiv = document.createElement('div');
    containerDiv.className = "meme";
    containerDiv.id = `meme-${idx}`;

    let img = document.createElement('img');

    let upperText = document.createElement('div');
    upperText.className = "upperText"

    let lowerText = document.createElement('div');
    lowerText.className = "lowerText"

    let transition = document.createElement('div');
    transition.className = "transition";

    let boxText = document.createElement('div');
    boxText.className = "boxText"

    img.src = meme.photoURL;
    upperText.textContent = meme.upperText;
    lowerText.textContent = meme.lowerText;
    boxText.textContent = "Delete?"
    containerDiv.append(
        img, upperText, lowerText, transition, boxText
    );

    containerDiv.addEventListener('click', handleDelete);
    return containerDiv;
}


function showMemes(memes) {
    console.log('showMemes')
    let memeArea = document.getElementById("memeWall");

    //memeArea.childNodes.forEach(child => child.remove());

    for (let i = 0; i < memeArea.children.length; i++) {
        memeArea.children[i].remove();
    }
    
    memes.forEach((el, idx) => memeArea.append(memeToDomElement(el, idx)));
}



function addMeme(photoURL, upperText, lowerText) {
    console.log('addMeme')

    memes.unshift({
        photoURL: photoURL,
        upperText: upperText,
        lowerText: lowerText,
    });

}

function handleSubmit(evt) {
    console.log('handleSubmit', evt);
    evt.preventDefault();

    let form = document.getElementById('memeForm');
    let photoURL = form.photoURL.value;
    let upperText = form.upperText.value;
    let lowerText = form.lowerText.value;
    addMeme(photoURL, upperText, lowerText);
    showMemes(memes);
    form.reset();
}

function handleDelete(evt) {
    console.log('handleDelete', evt, evt.currentTarget);
    evt.currentTarget.remove();
    let index = memeElementToIndex(evt.currentTarget);
    memes.splice(index,1);
}

function memeElementToIndex(target) {
    let id = target.id
    let index = id.slice(5);
    return index;
}


showMemes(memes);


document.getElementById("memeForm").addEventListener("submit", handleSubmit);