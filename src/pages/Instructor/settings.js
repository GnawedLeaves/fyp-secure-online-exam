document.addEventListener('DOMContentLoaded', function () {
    const examSettingsContent = document.querySelector('.examSettings');
    const resultSettingsContent = document.querySelector('.result-settings-content');
    const showResultSettingsButton = document.getElementById('showResultSettings');
    const saveResultSettingsButton = document.getElementById('saveResultSettings');
    const backToExamSettingsButton = document.getElementById('backToExamSettings');

    // Hide result settings on page load
    resultSettingsContent.style.display = 'none';

    showResultSettingsButton.addEventListener('click', function () {
        examSettingsContent.style.display = 'none';
        resultSettingsContent.style.display = 'block';
    });

    saveResultSettingsButton.addEventListener('click', function () {
        examSettingsContent.style.display = 'block';
        resultSettingsContent.style.display = 'none';
    });

    backToExamSettingsButton.addEventListener('click', function () {
        examSettingsContent.style.display = 'block';
        resultSettingsContent.style.display = 'none';
    });
});