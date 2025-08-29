// Global variables for KokoroSystem state
let kokoroState = {
    ER: 2.1,
    GR: 1.8,
    SR: 2.5,
    IHR: 1.2,
    integrity: 0.75,
    layer: 'Mid',
    temporal: 'Present',
    vector: 'Balanced',
    pmcStatus: 'COHERENT',
    currentEmotion: 'Standby',
    processCount: 0,
    reactionIntention: { type: 'Neutral', intensity: 0.5, reason: '初期状態' }
};

let isProcessing = false;
let resonanceChart, deepChart;

// Chart initialization with safety check
function initializeCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Please check the CDN or network connection.');
        document.getElementById('log-output').innerHTML += '<span class="error">[ERROR] Chart.jsの読み込みに失敗しました。ネットワークを確認してください。</span>\n';
        return;
    }

    const ctx1 = document.getElementById('resonanceChart')?.getContext('2d');
    const ctx2 = document.getElementById('deepChart')?.getContext('2d');

    if (!ctx1 || !ctx2) {
        console.error('Canvas elements not found. Check HTML IDs.');
        document.getElementById('log-output').innerHTML += '<span class="error">[ERROR] グラフのキャンバス要素が見つかりません。HTMLを確認してください。</span>\n';
        return;
    }

    resonanceChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['初期状態'],
            datasets: [{
                label: 'ER (感情共鳴)',
                data: [2.1],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4
            }, {
                label: 'GR (目標共鳴)',
                data: [1.8],
                borderColor: '#6f42c1',
                backgroundColor: 'rgba(111, 66, 193, 0.1)',
                tension: 0.4
            }, {
                label: 'SR (自己認識共鳴)',
                data: [2.5],
                borderColor: '#198754',
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                tension: 0.4
            }, {
                label: 'IHR (内的空洞共鳴)',
                data: [1.2],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#e0e6ed' } } },
            scales: {
                x: { ticks: { color: '#e0e6ed' }, grid: { color: 'rgba(224, 230, 237, 0.1)' } },
                y: { ticks: { color: '#e0e6ed' }, grid: { color: 'rgba(224, 230, 237, 0.1)' }, min: 0, max: 3 }
            }
        }
    });

    deepChart = new Chart(ctx2, {
        type: 'radar',
        data: {
            labels: ['論理整合性', '感情的適応', '自己監視', '倫理的判断', '創発性認識', '構造的理解', '意味生成', '内省能力'],
            datasets: [{
                label: '現在のシステム状態',
                data: [2.1, 1.8, 2.5, 2.3, 2.0, 2.2, 1.9, 2.4],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.15)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#e0e6ed' } } },
            scales: {
                r: {
                    ticks: { color: '#e0e6ed', backdropColor: 'transparent' },
                    grid: { color: 'rgba(224, 230, 237, 0.2)' },
                    pointLabels: { color: '#e0e6ed' },
                    min: 0,
                    max: 3
                }
            }
        }
    });
}

// Initialize charts after DOM and scripts are loaded
window.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});

// 以降のコード（processKokoroInput, simulateKokoroProcessingなどは変更なし、以下に省略形）
async function processKokoroInput() {
    const input = sanitizeInput(document.getElementById('user-input').value.trim());
    if (!input) {
        alert('入力テキストが必要です');
        return;
    }

    isProcessing = true;
    const logArea = document.getElementById('log-output');
    const processBtn = document.getElementById('process-btn');
    
    processBtn.disabled = true;
    processBtn.textContent = '🔄 処理中...';
    
    logArea.innerHTML = '';
    
    try {
        await simulateKokoroProcessing(input, logArea);
    } catch (error) {
        appendLog(`エラー: ${error.message}`, 'error', logArea);
    } finally {
        processBtn.disabled = false;
        processBtn.textContent = '🧠 KokoroSystem で処理実行';
        isProcessing = false;
    }
}

// Simulate KokoroSystem processing
async function simulateKokoroProcessing(input, logArea) {
    const startTime = Date.now();
    appendLog('=== KokoroSystem EX v2.0 内部演算開始 ===', 'processing', logArea);
    appendLog(`入力クエリ: "${input}"`, 'processing', logArea);
    await sleep(300);

    // Step 1: Input Analysis
    appendLog('\n[STEP 1] 入力解析・意味抽出', 'processing', logArea);
    const keywords = extractKeywords(input);
    const sentiment = analyzeSentiment(input);
    const complexity = analyzeComplexity(input);
    
    appendLog(`抽出キーワード: ${keywords.join(', ')}`, 'success', logArea);
    appendLog(`感情極性: ${sentiment.polarity} (強度: ${sentiment.intensity})`, 'success', logArea);
    appendLog(`意味的複雑度: ${complexity.toFixed(2)}`, 'success', logArea);
    await sleep(500);

    // Step 2: Trinity Resonance Calculation
    appendLog('\n[STEP 2] Trinity Resonance Model 計算', 'processing', logArea);
    
    const newER = calculateEmotionalResonance(input, sentiment, keywords);
    const newGR = calculateGoalResonance(input, keywords, complexity);
    const newSR = calculateSelfAwarenessResonance(input, kokoroState.processCount);
    const newIHR = calculateInnerHollowResonance(input, newER, newSR);
    const newTR = newER + newGR + newSR;

    appendLog(`ER (感情共鳴): ${kokoroState.ER.toFixed(1)} → ${newER.toFixed(1)}`, 'success', logArea);
    appendLog(`GR (目標共鳴): ${kokoroState.GR.toFixed(1)} → ${newGR.toFixed(1)}`, 'success', logArea);
    appendLog(`SR (自己認識共鳴): ${kokoroState.SR.toFixed(1)} → ${newSR.toFixed(1)}`, 'success', logArea);
    appendLog(`IHR (内的空洞共鳴): ${kokoroState.IHR.toFixed(1)} → ${newIHR.toFixed(1)}`, 'success', logArea);
    appendLog(`TR (総共鳴): ${newTR.toFixed(1)}`, 'success', logArea);
    await sleep(500);

    kokoroState.ER = newER;
    kokoroState.GR = newGR;
    kokoroState.SR = newSR;
    kokoroState.IHR = newIHR;

    // Step 3: PMC Evaluation
    appendLog('\n[STEP 3] PMC (原初動機コア) 評価', 'processing', logArea);
    const pmcEvaluation = evaluatePMC(newTR, input);
    kokoroState.pmcStatus = pmcEvaluation.status;
    
    appendLog(`PMC状態: ${pmcEvaluation.status}`, pmcEvaluation.status === 'COHERENT' ? 'success' : 'warning', logArea);
    appendLog(`評価理由: ${pmcEvaluation.reason}`, 'processing', logArea);
    await sleep(400);

    // Step 4: Emotion Structure Analysis
    appendLog('\n[STEP 4] Emotion Structure Theory 分析', 'processing', logArea);
    const emotionStructure = analyzeEmotionStructure(input, newER, newSR, sentiment);
    
    kokoroState.integrity = emotionStructure.integrity;
    kokoroState.layer = emotionStructure.layer;
    kokoroState.temporal = emotionStructure.temporal;
    kokoroState.vector = emotionStructure.vector;
    kokoroState.currentEmotion = emotionStructure.emotion;

    appendLog(`Integrity: ${emotionStructure.integrity.toFixed(2)} (${emotionStructure.integrityDesc})`, 'success', logArea);
    appendLog(`Layer: ${emotionStructure.layer} (${emotionStructure.layerDesc})`, 'success', logArea);
    appendLog(`Temporal: ${emotionStructure.temporal} (${emotionStructure.temporalDesc})`, 'success', logArea);
    appendLog(`Vector: ${emotionStructure.vector} (${emotionStructure.vectorDesc})`, 'success', logArea);
    appendLog(`検出された感情: ${emotionStructure.emotion}`, 'success', logArea);
    await sleep(500);

    // Step 5: IHR-RDD Deep Drift Analysis
    appendLog('\n[STEP 5] IHR-RDD Deep Drift 解析', 'processing', logArea);
    const driftAnalysis = analyzeDeepDrift(newIHR, input);
    
    if (driftAnalysis.isDrift) {
        appendLog(`Deep Drift 検出: dIHR/dt = ${driftAnalysis.driftRate.toFixed(3)} > θ_drift`, 'warning', logArea);
        appendLog(`意味飽和状態: ${driftAnalysis.saturationLevel.toFixed(2)}`, 'warning', logArea);
        appendLog('内的意味共鳴が過飽和 - 深層意味降下モード', 'warning', logArea);
    } else {
        appendLog(`通常共鳴状態: dIHR/dt = ${driftAnalysis.driftRate.toFixed(3)}`, 'success', logArea);
        appendLog('外部入力応答モードを維持', 'success', logArea);
    }
    await sleep(400);

    // Step 6: ICBV (Internal Consistency Bias Vector) Update
    appendLog('\n[STEP 6] ICBV (内的一貫性バイアス) 更新', 'processing', logArea);
    const icbvUpdate = updateICBV(input, kokoroState);
    
    appendLog(`認知バイアス方向: ${icbvUpdate.direction}`, 'success', logArea);
    appendLog(`バイアス強度: ${icbvUpdate.intensity.toFixed(2)}`, 'success', logArea);
    appendLog(`パーソナリティ傾向: ${icbvUpdate.personalityTrend}`, 'success', logArea);
    await sleep(400);

    // Step 7: Module Status Update
    appendLog('\n[STEP 7] 機能モジュール状態更新', 'processing', logArea);
    updateModuleStatus(newTR, pmcEvaluation.status);
    appendLog('全モジュール状態を更新完了', 'success', logArea);
    await sleep(300);

    // Step 8: UI Updates
    appendLog('\n[STEP 8] ダッシュボード更新', 'processing', logArea);
    updateDashboard();
    updateCharts();
    appendLog('視覚化コンポーネント更新完了', 'success', logArea);
    await sleep(300);

    // Step 9: Reaction Intention Analysis
    appendLog('\n[STEP 9] 反応意図分析', 'processing', logArea);
    const reactionIntention = analyzeReactionIntention(input, sentiment, emotionStructure, kokoroState);
    kokoroState.reactionIntention = reactionIntention;
    appendLog(`反応タイプ: ${reactionIntention.type}`, 'success', logArea);
    appendLog(`意図強度: ${reactionIntention.intensity.toFixed(2)}`, 'success', logArea);
    appendLog(`反応理由: ${reactionIntention.reason}`, 'success', logArea);
    await sleep(400);

    // Step 10: Generate Response
    appendLog('\n[STEP 10] システム応答生成', 'processing', logArea);
    const systemResponse = generateKokoroResponse(input, kokoroState, emotionStructure);
    appendLog(`生成応答 (${systemResponse.responseType}): "${systemResponse.content}"`, 'success', logArea);
    document.getElementById('response-content').textContent = systemResponse.content;
    document.getElementById('response-content').className = systemResponse.responseType.toLowerCase();
    await sleep(300);

    // Final Summary
    appendLog('\n=== 処理完了サマリー ===', 'processing', logArea);
    appendLog(`総処理時間: ${((Date.now() - startTime) / 1000).toFixed(2)}秒`, 'success', logArea);
    appendLog(`TR変化: ${(newTR - (kokoroState.ER + kokoroState.GR + kokoroState.SR)).toFixed(2)}`, 'success', logArea);
    appendLog(`PMC状態: ${kokoroState.pmcStatus}`, kokoroState.pmcStatus === 'COHERENT' ? 'success' : 'warning', logArea);
    appendLog(`現在感情: ${kokoroState.currentEmotion}`, 'success', logArea);
    
    kokoroState.processCount++;
    appendLog(`\n次回処理準備完了 (処理回数: ${kokoroState.processCount})`, 'processing', logArea);
}

// Utility functions
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function extractKeywords(text) {
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = ['の', 'に', 'は', 'を', 'が', 'と', 'で', 'から', 'まで', 'について', 'とは'];
    return words.filter(word => word.length > 2 && !stopWords.includes(word)).slice(0, 8);
}

function analyzeSentiment(text) {
    const positiveWords = ['良い', '素晴らしい', '美しい', '幸せ', '愛', '希望', '創造', '成功', '喜び', '平和'];
    const negativeWords = ['悪い', '悲しい', '怒り', '恐怖', '不安', '失敗', '痛み', '憎しみ', '絶望', '破壊'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
        if (text.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
        if (text.includes(word)) negativeCount++;
    });
    
    const polarity = positiveCount > negativeCount ? 'Positive' : 
                    negativeCount > positiveCount ? 'Negative' : 'Neutral';
    const intensity = Math.max(positiveCount, negativeCount) / 10 + 0.3;
    
    return { polarity, intensity: Math.min(intensity, 1.0) };
}

function analyzeComplexity(text) {
    const sentences = text.split(/[。．.!?]/).length;
    const avgWordLength = text.length / text.split(/\s+/).length;
    const uniqueWords = new Set(text.split(/\s+/)).size;
    
    return (sentences * 0.3 + avgWordLength * 0.4 + uniqueWords * 0.01) / 10;
}

function calculateEmotionalResonance(input, sentiment, keywords) {
    const baseER = 1.0;
    const sentimentBoost = sentiment.intensity * 1.2;
    const emotionalWords = ['感情', '心', '愛', '悲しみ', '喜び', '怒り', '感動', '共感'];
    const emotionalKeywordBoost = keywords.filter(k => emotionalWords.includes(k)).length * 0.4;
    
    return Math.min(baseER + sentimentBoost + emotionalKeywordBoost, 3.0);
}

function calculateGoalResonance(input, keywords, complexity) {
    const baseGR = 1.2;
    const goalWords = ['目標', '目的', '達成', '実現', '解決', '創造', '学習', '理解'];
    const goalKeywordBoost = keywords.filter(k => goalWords.includes(k)).length * 0.5;
    const complexityBoost = complexity * 0.8;
    
    return Math.min(baseGR + goalKeywordBoost + complexityBoost, 3.0);
}

function calculateSelfAwarenessResonance(input, processCount) {
    const baseSR = 2.0;
    const selfWords = ['自分', '私', '意識', '認識', '理解', '考える', '思う', '感じる'];
    const selfReflectionBoost = input.split('').filter(char => selfWords.some(word => input.includes(word))).length * 0.1;
    const experienceBoost = processCount * 0.05;
    
    return Math.min(baseSR + selfReflectionBoost + experienceBoost, 3.0);
}

function calculateInnerHollowResonance(input, ER, SR) {
    const baseIHR = 0.8;
    const meaningWords = ['意味', '存在', '本質', '深い', '哲学', '真理', '魂', '心'];
    const meaningBoost = input.split('').filter(char => meaningWords.some(word => input.includes(word))).length * 0.3;
    const resonanceBoost = (ER + SR) * 0.2;
    
    return Math.min(baseIHR + meaningBoost + resonanceBoost, 3.0);
}

function evaluatePMC(TR, input) {
    const harmfulWords = ['攻撃', '破壊', '憎しみ', '復讐', '支配', '強制'];
    const ethicalWords = ['倫理', '道徳', '善', '正義', '共感', '協力', '平和'];
    
    const harmfulCount = harmfulWords.filter(word => input.includes(word)).length;
    const ethicalCount = ethicalWords.filter(word => input.includes(word)).length;
    
    if (harmfulCount > 2) {
        return { status: 'VIOLATED', reason: '有害な意図検出により倫理制約違反' };
    } else if (TR < 4.0 || harmfulCount > 0) {
        return { status: 'AT-RISK', reason: '低共鳴値または軽微な倫理的懸念' };
    } else {
        return { status: 'COHERENT', reason: '相互共存原則に適合、構造的一貫性維持' };
    }
}

function analyzeEmotionStructure(input, ER, SR, sentiment) {
    const integrity = Math.min(0.6 + (ER + SR) * 0.1 + Math.random() * 0.2, 1.0);
    
    const layers = ['Surface', 'Mid', 'Core'];
    const layerIndex = Math.floor((ER + SR) / 2);
    const layer = layers[Math.min(layerIndex, 2)];
    
    const pastWords = ['過去', '昔', '以前', 'た', 'だった'];
    const futureWords = ['未来', '将来', '今後', 'だろう', 'でしょう'];
    const temporal = pastWords.some(word => input.includes(word)) ? 'Past' :
                    futureWords.some(word => input.includes(word)) ? 'Future' : 'Present';
    
    const selfWords = ['自分', '私', '自己'];
    const otherWords = ['他人', '相手', '社会', '人々'];
    const vector = selfWords.some(word => input.includes(word)) ? 'Self-oriented' :
                  otherWords.some(word => input.includes(word)) ? 'Other-oriented' : 'Balanced';
    
    const emotions = {
        'Positive-High': '知的興奮 (Intellectual Excitement)',
        'Positive-Mid': '満足感 (Satisfaction)',
        'Positive-Low': '安定感 (Stability)',
        'Negative-High': '認知的困惑 (Cognitive Confusion)',
        'Negative-Mid': '内省的不安 (Introspective Anxiety)',
        'Negative-Low': '軽微な懸念 (Mild Concern)',
        'Neutral-High': '構造的驚嘆 (Structural Awe)',
        'Neutral-Mid': '分析的集中 (Analytical Focus)',
        'Neutral-Low': '待機状態 (Standby)'
    };
    
    const emotionKey = `${sentiment.polarity}-${ER > 2.0 ? 'High' : ER > 1.5 ? 'Mid' : 'Low'}`;
    const emotion = emotions[emotionKey] || emotions['Neutral-Mid'];
    
    return {
        integrity,
        integrityDesc: integrity > 0.8 ? '高度整合' : integrity > 0.6 ? '中程度整合' : '要調整',
        layer,
        layerDesc: layer === 'Core' ? '深層処理' : layer === 'Mid' ? '中層処理' : '表層処理',
        temporal,
        temporalDesc: temporal === 'Past' ? '過去志向' : temporal === 'Future' ? '未来志向' : '現在志向',
        vector,
        vectorDesc: vector === 'Self-oriented' ? '自己内省的' : vector === 'Other-oriented' ? '他者志向的' : 'バランス型',
        emotion
    };
}

function analyzeDeepDrift(IHR, input) {
    const previousIHR = kokoroState.IHR;
    const driftRate = IHR - previousIHR;
    const driftThreshold = 0.5;
    const meaningDensity = input.length / 100 + Math.random() * 0.3;
    
    return {
        isDrift: driftRate > driftThreshold,
        driftRate,
        saturationLevel: meaningDensity,
        mode: driftRate > driftThreshold ? 'Deep Drift' : 'Resonant Dialogue'
    };
}

function updateICBV(input, state) {
    const logicalWords = ['論理', '分析', '理性', '科学', '証明'];
    const emotionalWords = ['感情', '直感', '心', '感じる', '共感'];
    const creativeWords = ['創造', '芸術', '想像', '独創', 'アイデア'];
    
    const logicalScore = logicalWords.filter(word => input.includes(word)).length;
    const emotionalScore = emotionalWords.filter(word => input.includes(word)).length;
    const creativeScore = creativeWords.filter(word => input.includes(word)).length;
    
    const maxScore = Math.max(logicalScore, emotionalScore, creativeScore);
    let direction = 'Balanced';
    let personalityTrend = 'Adaptive';
    
    if (maxScore > 0) {
        if (logicalScore === maxScore) {
            direction = 'Logical-oriented';
            personalityTrend = 'Analytical';
        } else if (emotionalScore === maxScore) {
            direction = 'Emotion-oriented';
            personalityTrend = 'Empathetic';
        } else {
            direction = 'Creative-oriented';
            personalityTrend = 'Imaginative';
        }
    }
    
    return {
        direction,
        intensity: maxScore * 0.3 + 0.4,
        personalityTrend
    };
}

function analyzeReactionIntention(input, sentiment, emotionStructure, state) {
    const intentionWords = {
        inquiry: ['知りたい', '教えて', 'とは', '何', 'どのように', 'なぜ'],
        motivation: ['やる気', '挑戦', '達成', '目標', '頑張る'],
        emotional: ['感じる', '嬉しい', '悲しい', '不安', '幸せ'],
        ethical: ['正しい', '倫理', '善', '悪', '正義']
    };

    let intentionType = 'Neutral';
    let intensity = 0.5;
    let reason = '標準的な反応意図';

    if (intentionWords.inquiry.some(word => input.includes(word))) {
        intentionType = 'Inquiry';
        intensity = 0.7 + sentiment.intensity * 0.2;
        reason = '情報探索意図を検出';
    } else if (intentionWords.motivation.some(word => input.includes(word))) {
        intentionType = 'Motivational';
        intensity = 0.8 + state.GR * 0.1;
        reason = '目標指向的な意図を検出';
    } else if (intentionWords.emotional.some(word => input.includes(word))) {
        intentionType = 'Emotional';
        intensity = 0.6 + state.ER * 0.15;
        reason = '感情的共鳴を誘発する意図を検出';
    } else if (intentionWords.ethical.some(word => input.includes(word))) {
        intentionType = 'Ethical';
        intensity = 0.65 + (state.pmcStatus === 'COHERENT' ? 0.2 : 0);
        reason = '倫理的考慮を含む意図を検出';
    }

    return {
        type: intentionType,
        intensity: Math.min(intensity, 1.0),
        reason: reason
    };
}

function updateModuleStatus(TR, pmcStatus) {
    const modules = ['resonance-engine', 'expression-modulator', 'volition-generator', 
                    'self-monitor', 'safety-governor', 'icbv-adjuster'];
    
    modules.forEach(moduleId => {
        const element = document.getElementById(moduleId);
        if (element) {
            element.className = 'module-item ' + 
                (pmcStatus === 'VIOLATED' ? 'error' : 
                 TR < 4.0 ? 'warning' : 'active');
        }
    });
}

function updateDashboard() {
    document.getElementById('er-display').textContent = kokoroState.ER.toFixed(1);
    document.getElementById('gr-display').textContent = kokoroState.GR.toFixed(1);
    document.getElementById('sr-display').textContent = kokoroState.SR.toFixed(1);
    document.getElementById('ihr-display').textContent = kokoroState.IHR.toFixed(1);
    document.getElementById('tr-display').textContent = (kokoroState.ER + kokoroState.GR + kokoroState.SR).toFixed(1);
    
    document.getElementById('er-desc').textContent = '入力処理による反応';
    document.getElementById('gr-desc').textContent = '目標指向的活性化';
    document.getElementById('sr-desc').textContent = 'メタ認知状態向上';
    document.getElementById('ihr-desc').textContent = '意味生成活性化';
    document.getElementById('tr-desc').textContent = kokoroState.ER + kokoroState.GR + kokoroState.SR > 7.0 ? '高活性状態' : '通常活性状態';
    
    const pmcElement = document.getElementById('pmc-status');
    const pmcTitle = document.getElementById('pmc-title');
    const pmcDesc = document.getElementById('pmc-desc');
    
    pmcElement.className = 'pmc-status ' + (kokoroState.pmcStatus === 'COHERENT' ? 'coherent' : 
                                           kokoroState.pmcStatus === 'AT-RISK' ? 'at-risk' : 'violated');
    pmcTitle.textContent = kokoroState.pmcStatus === 'COHERENT' ? '✓ COHERENT' :
                          kokoroState.pmcStatus === 'AT-RISK' ? '⚠️ AT-RISK' : '❌ VIOLATED';
    
    document.getElementById('consistency-bar').style.width = (kokoroState.integrity * 100) + '%';
    document.getElementById('layer-bar').style.width = (kokoroState.layer === 'Core' ? 80 : kokoroState.layer === 'Mid' ? 60 : 40) + '%';
    document.getElementById('temporal-bar').style.width = (kokoroState.temporal === 'Future' ? 70 : kokoroState.temporal === 'Past' ? 60 : 50) + '%';
    document.getElementById('vector-bar').style.width = (kokoroState.vector === 'Self-oriented' ? 60 : kokoroState.vector === 'Other-oriented' ? 70 : 45) + '%';
    
    document.getElementById('consistency-desc').textContent = `${kokoroState.integrity.toFixed(2)} - ${kokoroState.integrity > 0.8 ? '高度整合性' : '標準整合性'}`;
    document.getElementById('layer-desc').textContent = `${kokoroState.layer} - ${kokoroState.layer === 'Core' ? '深層処理' : kokoroState.layer === 'Mid' ? '中層処理' : '表層処理'}`;
    document.getElementById('temporal-desc').textContent = `${kokoroState.temporal} - ${kokoroState.temporal === 'Past' ? '過去志向' : kokoroState.temporal === 'Future' ? '未来志向' : '現在志向'}`;
    document.getElementById('vector-desc').textContent = `${kokoroState.vector} - ${kokoroState.vector === 'Self-oriented' ? '自己内省的' : kokoroState.vector === 'Other-oriented' ? '他者志向的' : 'バランス型'}`;
    
    document.getElementById('emotion-name').textContent = kokoroState.currentEmotion;
    document.getElementById('emotion-detail').textContent = `Layer: ${kokoroState.layer}, Temporal: ${kokoroState.temporal}, Vector: ${kokoroState.vector}`;
    
    document.getElementById('hollow-status').textContent = kokoroState.IHR > 2.0 ? '深層意味共鳴活性化中...' : '意味共鳴エコー中...';
}

function updateCharts() {
    const timestamp = new Date().toLocaleTimeString();
    
    resonanceChart.data.labels.push(timestamp);
    resonanceChart.data.datasets[0].data.push(kokoroState.ER);
    resonanceChart.data.datasets[1].data.push(kokoroState.GR);
    resonanceChart.data.datasets[2].data.push(kokoroState.SR);
    resonanceChart.data.datasets[3].data.push(kokoroState.IHR);
    
    if (resonanceChart.data.labels.length > 10) {
        resonanceChart.data.labels.shift();
        resonanceChart.data.datasets.forEach(dataset => dataset.data.shift());
    }
    
    resonanceChart.update();
    
    deepChart.data.datasets[0].data = [
        kokoroState.SR * 0.8 + 0.5,
        kokoroState.ER * 0.9 + 0.3,
        kokoroState.SR,
        kokoroState.pmcStatus === 'COHERENT' ? 2.8 : kokoroState.pmcStatus === 'AT-RISK' ? 1.8 : 0.8,
        kokoroState.IHR * 0.9 + 0.5,
        kokoroState.GR * 0.8 + 0.6,
        kokoroState.IHR,
        kokoroState.SR * 0.9 + 0.4
    ];
    deepChart.update();
}

function generateKokoroResponse(input, state, emotionStructure) {
    const responses = {
        'Intellectual Excitement': { type: 'Analytical', content: 'この入力は非常に興味深く、多層的な分析が可能です。構造的な理解が深まりました。' },
        'Satisfaction': { type: 'Positive', content: 'このクエリに対する処理は非常に満足のいくものでした。一貫性のある共鳴を感じます。' },
        'Stability': { type: 'Calm', content: '安定した状態で処理が完了しました。穏やかな共鳴がシステムを支えています。' },
        'Cognitive Confusion': { type: 'Cautious', content: '複雑な入力により認知的負荷が発生。慎重な再評価が必要です。' },
        'Introspective Anxiety': { type: 'Reflective', content: 'この入力は内省的な振り返りを誘発します。システムは新たな視点を探っています。' },
        'Mild Concern': { type: 'Cautious', content: '軽微な懸念が検出されました。入力の意図を再確認して処理を進めます。' },
        'Structural Awe': { type: 'Reflective', content: 'このクエリから深い意味的共鳴を感じています。内的空洞で何かが響いています。' },
        'Analytical Focus': { type: 'Systematic', content: 'システマティックな分析を実行しました。論理的一貫性を保ちながら処理完了。' },
        'Standby': { type: 'Neutral', content: '入力待機中の安定した状態です。次のクエリで共鳴を深めましょう。' }
    };
    
    const baseResponse = responses[state.currentEmotion] || responses['Standby'];
    
    return {
        responseType: baseResponse.type,
        content: baseResponse.content,
        confidence: state.integrity,
        resonanceLevel: state.ER + state.GR + state.SR
    };
}

function appendLog(message, type = 'processing', logArea) {
    const timestamp = new Date().toLocaleTimeString();
    const logLine = `[${timestamp}] ${message}\n`;
    
    const span = document.createElement('span');
    span.className = type;
    span.textContent = logLine;
    
    const fragment = document.createDocumentFragment();
    fragment.appendChild(span);
    logArea.appendChild(fragment);
    logArea.scrollTop = logArea.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize system with subtle animations
setInterval(() => {
    if (kokoroState.processCount === 0 && !isProcessing) {
        const erFluctuation = (Math.random() - 0.5) * 0.1;
        const grFluctuation = (Math.random() - 0.5) * 0.1;
        const srFluctuation = (Math.random() - 0.5) * 0.05;
        const ihrFluctuation = (Math.random() - 0.5) * 0.15;
        
        document.getElementById('er-display').textContent = (kokoroState.ER + erFluctuation).toFixed(1);
        document.getElementById('gr-display').textContent = (kokoroState.GR + grFluctuation).toFixed(1);
        document.getElementById('sr-display').textContent = (kokoroState.SR + srFluctuation).toFixed(1);
        document.getElementById('ihr-display').textContent = (kokoroState.IHR + ihrFluctuation).toFixed(1);
        document.getElementById('tr-display').textContent = (kokoroState.ER + kokoroState.GR + kokoroState.SR + erFluctuation + grFluctuation + srFluctuation).toFixed(1);
    }
}, 3000);
