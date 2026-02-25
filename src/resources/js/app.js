function toggleFlip(button) {
    const card = button.querySelector(".card");
    card.classList.toggle("flipped");
}

window.toggleFlip = toggleFlip