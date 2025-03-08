// Translation functionality for PicoScenes documentation
$(document).ready(function() {
    // Initialize the translation dropdown
    initTranslationDropdown();
    
    // Handle translation button click
    $('#translate-btn').on('click', function() {
        const targetLang = $('#language-select').val();
        const translationService = $('#translation-service').val();
        
        if (targetLang === 'original') {
            // Restore original content
            restoreOriginalContent();
        } else {
            // Translate the content
            translateContent(targetLang, translationService);
        }
    });
    
    // Handle language selection change
    $('#language-select').on('change', function() {
        updateTranslateButtonState();
    });
    
    // Initialize button state
    updateTranslateButtonState();
});

// Translation services data
const translationServices = [
    { 
        id: 'google', 
        name: 'Google Translate', 
        icon: 'google',
        url: 'https://translate.google.com/translate?sl=auto&tl={lang}&u={url}',
        supportedLanguages: '*' // All languages supported
    },
    { 
        id: 'deepl', 
        name: 'DeepL Translator', 
        icon: 'language',
        url: 'https://www.deepl.com/translator#auto/{lang}/{url}',
        supportedLanguages: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'pl', 'ru', 'ja', 'zh', 'bg', 'cs', 'da', 'et', 'fi', 'el', 'hu', 'lv', 'lt', 'ro', 'sk', 'sl', 'sv']
    },
    { 
        id: 'baidu', 
        name: 'Baidu Translate', 
        icon: 'globe',
        url: 'https://fanyi.baidu.com/transpage?query={url}&from=auto&to={lang}&source=url&render=1',
        supportedLanguages: ['zh', 'en', 'jp', 'kor', 'fra', 'spa', 'th', 'ara', 'ru', 'pt', 'de', 'it', 'el', 'nl', 'pl', 'bul', 'est', 'dan', 'fin', 'cs', 'rom', 'slo', 'swe', 'hu', 'vie', 'yue', 'wyw', 'zh-TW']
    }
];

// Language data with flags and native names
const languages = [
    { code: 'original', name: 'Original (English)', flag: 'us', native: 'English' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: 'cn', native: '中文', 
      serviceMapping: { baidu: 'zh' } },
    { code: 'zh-TW', name: 'Chinese (Traditional)', flag: 'tw', native: '繁體中文',
      serviceMapping: { baidu: 'zh-TW', deepl: 'zh' } },
    { code: 'es', name: 'Spanish', flag: 'es', native: 'Español' },
    { code: 'fr', name: 'French', flag: 'fr', native: 'Français',
      serviceMapping: { baidu: 'fra' } },
    { code: 'de', name: 'German', flag: 'de', native: 'Deutsch' },
    { code: 'ja', name: 'Japanese', flag: 'jp', native: '日本語',
      serviceMapping: { baidu: 'jp' } },
    { code: 'ko', name: 'Korean', flag: 'kr', native: '한국어',
      serviceMapping: { baidu: 'kor' } },
    { code: 'ru', name: 'Russian', flag: 'ru', native: 'Русский' },
    { code: 'ar', name: 'Arabic', flag: 'sa', native: 'العربية',
      serviceMapping: { baidu: 'ara' } },
    { code: 'pt', name: 'Portuguese', flag: 'pt', native: 'Português' },
    { code: 'it', name: 'Italian', flag: 'it', native: 'Italiano' },
    { code: 'nl', name: 'Dutch', flag: 'nl', native: 'Nederlands' },
    { code: 'hi', name: 'Hindi', flag: 'in', native: 'हिन्दी' },
    { code: 'vi', name: 'Vietnamese', flag: 'vn', native: 'Tiếng Việt',
      serviceMapping: { baidu: 'vie' } }
];

// Initialize the translation dropdown with language options
function initTranslationDropdown() {
    const languageSelect = $('#language-select');
    const serviceSelect = $('#translation-service');
    
    // Add flag image to label
    $('label[for="language-select"]').prepend('<i class="fa fa-language"></i>');
    
    // Add translate icon to button
    $('#translate-btn').prepend('<i class="fa fa-globe"></i>');
    
    // Add language options to select
    languages.forEach(lang => {
        const flagImg = lang.code === 'original' ? '' : 
            `<img src="https://flagcdn.com/16x12/${lang.flag}.png" class="language-flag" alt="${lang.name} flag">`;
        
        const optionText = lang.code === 'original' ? 
            `${lang.name}` : 
            `${lang.native}`;
        
        const option = $(`<option value="${lang.code}" data-flag="${lang.flag}">${optionText}</option>`);
        languageSelect.append(option);
    });
    
    // Add translation service options
    translationServices.forEach(service => {
        const icon = `<i class="fa fa-${service.icon}"></i>`;
        const option = $(`<option value="${service.id}" data-icon="${service.icon}">${service.name}</option>`);
        serviceSelect.append(option);
    });
    
    // Try to detect user's browser language and set it as default
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    
    // Find a matching language
    const matchedLang = languages.find(lang => 
        lang.code === browserLang || lang.code === shortLang || lang.code.startsWith(shortLang + '-')
    );
    
    if (matchedLang && matchedLang.code !== 'original') {
        languageSelect.val(matchedLang.code);
        updateTranslateButtonState();
    }
    
    // Set default translation service based on region
    // This is a simple heuristic and can be improved
    if (browserLang.startsWith('zh')) {
        // For Chinese users, default to Baidu
        serviceSelect.val('baidu');
    } else if (browserLang.startsWith('ru')) {
        // For Russian users, default to DeepL
        serviceSelect.val('deepl');
    } else if (['de', 'fr', 'es', 'it', 'nl', 'pl', 'pt'].includes(shortLang)) {
        // For European users, default to DeepL
        serviceSelect.val('deepl');
    } else {
        // Default to Google for other languages
        serviceSelect.val('google');
    }
}

// Update translate button state based on selected language
function updateTranslateButtonState() {
    const targetLang = $('#language-select').val();
    const translateBtn = $('#translate-btn');
    
    if (targetLang === 'original') {
        translateBtn.text('View Original');
        translateBtn.find('i').removeClass('fa-globe').addClass('fa-undo');
    } else {
        translateBtn.html('<i class="fa fa-globe"></i> Translate');
    }
    
    // Check if the selected language is supported by the selected service
    checkLanguageServiceCompatibility();
}

// Check if the selected language is supported by the selected translation service
function checkLanguageServiceCompatibility() {
    const targetLang = $('#language-select').val();
    const serviceId = $('#translation-service').val();
    
    if (targetLang === 'original') {
        // No need to check compatibility for original language
        $('#service-compatibility-warning').hide();
        return;
    }
    
    const service = translationServices.find(s => s.id === serviceId);
    if (!service) return;
    
    // Get the language code mapped to this service if available
    const selectedLang = languages.find(l => l.code === targetLang);
    let langCodeForService = targetLang;
    
    if (selectedLang && selectedLang.serviceMapping && selectedLang.serviceMapping[serviceId]) {
        langCodeForService = selectedLang.serviceMapping[serviceId];
    }
    
    // Check if the language is supported
    let isSupported = false;
    if (service.supportedLanguages === '*') {
        isSupported = true;
    } else if (Array.isArray(service.supportedLanguages)) {
        isSupported = service.supportedLanguages.includes(langCodeForService) || 
                     service.supportedLanguages.includes(langCodeForService.split('-')[0]);
    }
    
    // Show warning if not supported
    if (!isSupported) {
        $('#service-compatibility-warning').show().html(
            `<i class="fa fa-exclamation-triangle"></i> ${selectedLang.name} may not be fully supported by ${service.name}`
        );
    } else {
        $('#service-compatibility-warning').hide();
    }
}

// Store the original content before translation
let originalContent = null;
let lastTranslatedLang = null;

// Translate the content using the selected translation service
function translateContent(targetLang, serviceId) {
    // Show loading indicator
    $('#translation-status').html('<i class="fa fa-spinner fa-spin"></i> Translating...');
    
    // Store original content if not already stored
    if (!originalContent) {
        originalContent = {
            title: $('.post-title-main').html(),
            content: $('.post-content').html()
        };
    }
    
    // Remember last translated language
    lastTranslatedLang = targetLang;
    
    // Get selected language details
    const selectedLang = languages.find(lang => lang.code === targetLang);
    
    // Get selected service details
    const service = translationServices.find(s => s.id === serviceId);
    if (!service) {
        $('#translation-status').html('<i class="fa fa-exclamation-circle"></i> Translation service not found');
        return;
    }
    
    // Get the language code mapped to this service if available
    let langCodeForService = targetLang;
    if (selectedLang && selectedLang.serviceMapping && selectedLang.serviceMapping[serviceId]) {
        langCodeForService = selectedLang.serviceMapping[serviceId];
    }
    
    // Build the translation URL
    let translateUrl = service.url
        .replace('{lang}', langCodeForService)
        .replace('{url}', encodeURIComponent(window.location.href));
    
    // Open in new tab
    const newWindow = window.open(translateUrl, '_blank');
    
    // Update status with flag and service icon if available
    let statusHtml = '<i class="fa fa-check"></i> ';
    
    if (selectedLang && selectedLang.flag) {
        statusHtml += `<img src="https://flagcdn.com/16x12/${selectedLang.flag}.png" class="language-flag" alt="${selectedLang.name} flag"> `;
    }
    
    statusHtml += `Translation opened in ${service.name}`;
    $('#translation-status').html(statusHtml);
    
    // Focus on new window if possible
    if (newWindow) {
        newWindow.focus();
    }
}

// Restore the original content
function restoreOriginalContent() {
    if (originalContent) {
        $('.post-title-main').html(originalContent.title);
        $('.post-content').html(originalContent.content);
        
        // Update status
        $('#translation-status').html('<i class="fa fa-check"></i> Original content restored');
        
        // Reset last translated language
        lastTranslatedLang = null;
    }
} 