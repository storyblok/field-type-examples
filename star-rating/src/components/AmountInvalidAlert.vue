<template>
    <section class="invalid-box">
        <h1 class="invalid-box__heading">Invalid Option</h1>
        <p class="invalid-box__content">
            The <code>amount</code> option should be greater than 0
        </p>
    </section>
</template>

<style scoped>
.invalid-box {
    background: #ffd7d5;
    border-radius: 5px;
    box-sizing: border-box;
    padding: .5rem 1rem;
}

.invalid-box__heading {
    font-size: 1rem;
}
</style>
