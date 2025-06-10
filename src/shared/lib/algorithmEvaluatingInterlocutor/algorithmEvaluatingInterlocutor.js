export function evaluateDescriptionQuality(desc, maxScore = 30) {
    if (!desc || !desc.trim()) {
        return 0;
    }

    const text = desc.trim();
    let total = 0;

    // 1. Длина текста
    const len = text.length;
    const idealMin = 100;
    const idealMax = 300;
    let lengthScore;
    if (len < idealMin) {
        lengthScore = (len / idealMin) * (maxScore * 0.4);
    } else if (len <= idealMax) {
        lengthScore = maxScore * 0.4;
    } else {
        lengthScore = maxScore * 0.4;
    }
    total += lengthScore;

    // 2. Употребление первого лица
    const firstPersonWords = ['я', 'мне', 'меня'];
    const words = text.toLowerCase().split(/[^а-яё]+/).filter(Boolean);
    const pronouns = words.filter(word => firstPersonWords.includes(word)).length;
    const pronounScore = Math.min(pronouns, 5) / 5 * (maxScore * 0.2);

    total += pronounScore;

    // 3. Количество предложений
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const sentCount = Math.min(sentences, 5);
    const sentenceScore = (sentCount / 5) * (maxScore * 0.2);

    total += sentenceScore;

    // 4. Ключевые слова
    const keywords = ['люблю', 'умею', 'работаю', 'учусь', 'увлекаюсь', 'семья', 'путешествия', 'ценю', 'интересуюсь', 'нравится'];
    let keyCount = 0;
    for (let kw of keywords) {
        if (new RegExp(kw, 'i').test(text)) {
            keyCount++;
        }
    }
    const keywordScore = Math.min(keyCount, 5) / 5 * (maxScore * 0.2);

    total += keywordScore;

    const finalScore = Math.round(total);
    return finalScore;
}


export function computeProfileCompleteness(profile) {
    let score = 0;

    // 1. Оценка качества описания
    score += evaluateDescriptionQuality(profile.description, 30);

    // 2. Интересы (до 8 баллов, до 5 элементов)
    if (Array.isArray(profile.interests)) {
        const count = Math.min(profile.interests.length, 5);
        score += (count / 5) * 8;
    }

    // 3. Музыка (до 8 баллов, до 5 элементов)
    if (Array.isArray(profile.music)) {
        const count = Math.min(profile.music.length, 5);
        score += (count / 5) * 8;
    }

    // 4. Фильмы (до 5 баллов, до 5 элементов)
    if (profile?.films[0]) {
        score += 5;
    }

    // 5. Книги (до 5 баллов, до 5 элементов)
    if (profile?.books[0]) {
        score += 5;
    }

    // 6. Игры (5 баллов за наличие хотя бы одной игры)
    if (Array.isArray(profile.games) && profile.games.length > 0) {
        score += 5;
    }

    // 7. Фото (до 12 баллов, до 5 фото, каждая по 2.4 балла)
    if (Array.isArray(profile.photos)) {
        const count = Math.min(profile.photos.length, 5);
        score += count * (12 / 5);
    }

    // 8. Семейный статус (4 балла, если указано не null)
    if (profile.marital_status_id != null) {
        score += 4;
    }

    // 9. Курение (1→2 балла, 2→4 балла)
    if (profile.smoking_attitude_id === 1) {
        score += 2;
    } else if (profile.smoking_attitude_id === 2) {
        score += 4;
    }

    // 10. Алкоголь (1→2 балла, 2 или 3→4 балла)
    if (profile.alcohol_attitude_id === 1) {
        score += 2;
    } else if (profile.alcohol_attitude_id === 2 || profile.alcohol_attitude_id === 3) {
        score += 4;
    }

    // 11. Физактивность (5 баллов, если указано)
    if (profile.physical_activity_id != null) {
        score += 5;
    }

    // 12. Отношение к детям (5 баллов, если указано)
    if (profile.children_attitude_id != null) {
        score += 5;
    }

    // 13. Рост (5 баллов, если указано)
    if (profile.height_cm != null) {
        score += 5;
    }

    // Окончательная оценка: округляем и не даём выйти за пределы [0,100]
    score = Math.round(Math.max(0, Math.min(score, 100)));
    return score;
}