/**
 * Оценивает «качество» описания: насколько оно похоже на ответ на вопрос "расскажите о себе".
 * Возвращает число от 0 до maxScore.
 */
export function evaluateDescriptionQuality(desc, maxScore = 30) {
    console.log('-----------------------------')
    console.log('-----------------------------')
    console.log('-----------------------------')
    if (!desc || !desc.trim()) {
        console.log("Описание отсутствует — 0 баллов");
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
        console.log(`Длина описания: ${len} символов — частичный бонус за длину: ${lengthScore.toFixed(2)} / 12`);
    } else if (len <= idealMax) {
        lengthScore = maxScore * 0.4;
        console.log(`Длина описания: ${len} символов — максимальный бонус за длину: ${lengthScore.toFixed(2)} / 12`);
    } else {
        lengthScore = maxScore * 0.4;
        console.log(`Длина описания превышает 300 символов — ограниченный бонус за длину: ${lengthScore.toFixed(2)} / 12`);
    }
    total += lengthScore;

    // 2. Употребление первого лица
    const firstPersonWords = ['я', 'мне', 'меня'];
    const words = text.toLowerCase().split(/[^а-яё]+/).filter(Boolean);
    const pronouns = words.filter(word => firstPersonWords.includes(word)).length;
    const pronounScore = Math.min(pronouns, 5) / 5 * (maxScore * 0.2);
    console.log(`Первое лицо (${pronouns} упоминаний): ${pronounScore.toFixed(2)} / 6`);

    total += pronounScore;

    // 3. Количество предложений
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const sentCount = Math.min(sentences, 5);
    const sentenceScore = (sentCount / 5) * (maxScore * 0.2);
    console.log(`Количество предложений: ${sentences} — ${sentenceScore.toFixed(2)} / 6`);

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
    console.log(`Ключевые темы (${keyCount} найдено): ${keywordScore.toFixed(2)} / 6`);

    total += keywordScore;

    const finalScore = Math.round(total);
    console.log(`Итоговая оценка качества описания: ${finalScore} / ${maxScore}`);
    return finalScore;
}


export function computeProfileCompleteness(profile) {
    console.log('--------------------------')
    console.log('--------------------------')
    console.log('--------------------------')
    let score = 0;

    // 1. Оценка качества описания
    score += evaluateDescriptionQuality(profile.description, 30);

    // 2. Интересы (до 8 баллов, до 5 элементов)
    if (Array.isArray(profile.interests)) {
        const count = Math.min(profile.interests.length, 5);
        console.log('Интересы', (count / 5) * 8)
        score += (count / 5) * 8;
    }

    // 3. Музыка (до 8 баллов, до 5 элементов)
    if (Array.isArray(profile.music)) {
        const count = Math.min(profile.music.length, 5);
        console.log('Музыка', (count / 5) * 8)
        score += (count / 5) * 8;
    }

    // 4. Фильмы (до 5 баллов, до 5 элементов)
    if (profile?.films[0]) {
        console.log('Фильмы', 5)
        score += 5;
    }

    // 5. Книги (до 5 баллов, до 5 элементов)
    if (profile?.books[0]) {
        console.log('Книги', 5)
        score += 5;
    }

    // 6. Игры (5 баллов за наличие хотя бы одной игры)
    if (Array.isArray(profile.games) && profile.games.length > 0) {
        console.log('Игры', 5)
        score += 5;
    }

    // 7. Фото (до 12 баллов, до 5 фото, каждая по 2.4 балла)
    if (Array.isArray(profile.photos)) {
        const count = Math.min(profile.photos.length, 5);
        console.log('Фото', count * (12 / 5))
        score += count * (12 / 5);
    }

    // 8. Семейный статус (4 балла, если указано не null)
    if (profile.marital_status_id != null) {
        score += 4;
        console.log('Семейный статус', 4)
    }

    // 9. Курение (1→2 балла, 2→4 балла)
    if (profile.smoking_attitude_id === 1) {
        score += 2;
        console.log('Курение', 2)
    } else if (profile.smoking_attitude_id === 2) {
        score += 4;
        console.log('Курение', 4)
    }

    // 10. Алкоголь (1→2 балла, 2 или 3→4 балла)
    if (profile.alcohol_attitude_id === 1) {
        score += 2;
        console.log('Алкоголь', 2)
    } else if (profile.alcohol_attitude_id === 2 || profile.alcohol_attitude_id === 3) {
        score += 4;
        console.log('Алкоголь', 4)
    }

    // 11. Физактивность (5 баллов, если указано)
    if (profile.physical_activity_id != null) {
        score += 5;
        console.log('Физактивность', 5)
    }

    // 12. Отношение к детям (5 баллов, если указано)
    if (profile.children_attitude_id != null) {
        score += 5;
        console.log('Отношение к детям', 5)
    }

    // 13. Рост (5 баллов, если указано)
    if (profile.height_cm != null) {
        score += 5;
        console.log('Рост', 5)
    }

    // Окончательная оценка: округляем и не даём выйти за пределы [0,100]
    score = Math.round(Math.max(0, Math.min(score, 100)));
    return score;
}