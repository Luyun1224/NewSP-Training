import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar
} from 'recharts';
import { Heart, BookOpen, Star, Users, Lightbulb, ArrowRight, Quote, Sparkles, Loader2, TrendingUp, BrainCircuit, Activity } from 'lucide-react';

// --- 組件設計 ---

const Header = ({ count }) => {
  const totalTrainees = 11; // 總受訓人數
  const responseRate = Math.round((count / totalTrainees) * 100);

  return (
    <header className="relative bg-slate-900 text-white overflow-hidden pb-16 pt-12 px-6">
      {/* 背景圖片層 (請在此處替換您的合照 URL) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", // 暫時使用一張醫學教育相關的圖當示意
          filter: "grayscale(30%)"
        }}
      ></div>
      
      {/* 漸層遮罩，讓文字更清晰 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg shadow-orange-500/30">奇美醫院</span>
              <span className="text-orange-300 font-medium text-sm tracking-wide">臨床技能中心</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-shadow-lg">
              標準化病人培訓工作坊
            </h1>
            
            {/* 三大關鍵字 - Hero Keywords */}
            <div className="flex flex-wrap gap-3 text-lg md:text-xl font-light text-orange-200/90 tracking-widest mt-2">
              <span>以人為本</span>
              <span className="text-white/30">x</span>
              <span>建立安全感</span>
              <span className="text-white/30">x</span>
              <span>專業傳承</span>
            </div>
          </div>

          {/* 數據概況卡片 (深色玻璃擬態) */}
          <div className="mt-8 md:mt-0 flex gap-4">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-white">{totalTrainees}</div>
                <div className="text-white/60 text-xs mt-1">培訓人數</div>
             </div>
             
             <div className="bg-orange-500/20 backdrop-blur-md p-4 rounded-2xl border border-orange-500/30 text-center min-w-[100px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div className="text-3xl font-bold text-orange-400">{responseRate}%</div>
                <div className="text-orange-200/60 text-xs mt-1">問卷回收率</div>
             </div>
          </div>
        </div>

        {/* 理論架構區 (微調為深色背景適配版) */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 border-t border-white/10 pt-8">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><BookOpen size={20} /></div>
              <h3 className="font-bold text-orange-100">Miller's Pyramid</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              從 <span className="text-orange-400">Knows</span> 到 <span className="text-orange-400">Does</span>，透過實作演練確保演出的一致性與標準化。
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Heart size={20} /></div>
              <h3 className="font-bold text-green-100">以人為本的回饋</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              SP 是醫學生的鏡子，重點在於給予具備溫度的<span className="text-green-400">建設性回饋</span>。
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Users size={20} /></div>
              <h3 className="font-bold text-blue-100">社群歸屬感</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              建立<span className="text-blue-400">心理安全感</span>，讓夥伴在模擬情境中能安心展現情感。
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- 數據洞察組件 ---
const InsightsSection = ({ avgData }) => {
  if (!avgData) return null;

  const growth = (Number(avgData.q8_post) - Number(avgData.q8_pre)).toFixed(1);
  
  const competencies = [
    { name: '角色任務認知', score: Number(avgData.q3) },
    { name: '劇本理解力', score: Number(avgData.q4) },
    { name: '演出技巧', score: Number(avgData.q5) },
    { name: '回饋技巧', score: Number(avgData.q6) },
    { name: '講師引導吸收', score: Number(avgData.q7) },
  ];
  const topCompetency = competencies.reduce((prev, current) => (prev.score > current.score) ? prev : current);

  return (
    <div className="bg-white py-12 px-6 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="w-2 h-8 bg-purple-500 mr-3 rounded-full"></span>
          深度洞察分析
          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 flex items-center gap-1">
            <Sparkles size={12} className="text-purple-500"/> AI 輔助解讀
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 信心成長分析 */}
          <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">信心躍升歸因分析</h3>
            </div>
            
            <div className="mb-6 flex items-baseline gap-2">
              <div className="text-4xl font-bold text-orange-500">+{growth}</div>
              <div className="text-gray-500 font-medium">分 / 平均信心指數成長</div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 min-w-[20px]"><ArrowRight size={16} className="text-orange-400" /></div>
                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                  <span className="font-bold text-gray-800">跨越未知的關鍵</span><br/>
                  數據顯示學員從訓前的「未知與忐忑」成功轉化為訓後的「準備就緒」。歸因於工作坊首重<span className="bg-orange-100 px-1 mx-1 rounded text-orange-800 font-medium">建立安全感</span>的氛圍營造，破冰活動有效降低了學員對「犯錯」的焦慮。
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 min-w-[20px]"><ArrowRight size={16} className="text-orange-400" /></div>
                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                  講師的示範讓學員明白 SP 的重點不在於「演得多像」，而在於「真實呈現與回饋」，這種認知的修正直接提升了自信心。
                </p>
              </div>
            </div>
          </div>

          {/* 核心能力分析 */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">核心能力成效解讀</h3>
            </div>

            <div className="mb-6">
              <div className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">最強核心指標</div>
              <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                {topCompetency.name} 
                <span className="text-lg bg-blue-100 px-2 py-0.5 rounded-full text-blue-700">{topCompetency.score.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1 min-w-[20px]"><ArrowRight size={16} className="text-blue-400" /></div>
                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                  <span className="font-bold text-gray-800">從「演」到「教」的昇華</span><br/>
                  五大指標的高分表現（皆高於 4.0），特別是在<span className="bg-blue-100 px-1 mx-1 rounded text-blue-800 font-medium">{topCompetency.name}</span>的優異成績，顯示學員不僅掌握了外在表演，更內化了作為「教學者」的職責。
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 min-w-[20px]"><ArrowRight size={16} className="text-blue-400" /></div>
                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                   質性回饋中頻繁出現「換位思考」、「溫暖建議」等關鍵字，證實學員已理解：標準化病人的價值在於能否給予醫學生具體且溫暖的修正建議。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChartSection = ({ data }) => {
  // 計算平均數
  const avgData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const sums = data.reduce((acc, curr) => ({
      q3: acc.q3 + (Number(curr.q3) || 0),
      q4: acc.q4 + (Number(curr.q4) || 0),
      q5: acc.q5 + (Number(curr.q5) || 0),
      q6: acc.q6 + (Number(curr.q6) || 0),
      q7: acc.q7 + (Number(curr.q7) || 0),
      q8_pre: acc.q8_pre + (Number(curr.q8_pre) || 0),
      q8_post: acc.q8_post + (Number(curr.q8_post) || 0),
      q10: acc.q10 + (Number(curr.q10) || 0),
      q12: acc.q12 + (Number(curr.q12) || 0),
      q13: acc.q13 + (Number(curr.q13) || 0),
    }), { q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8_pre: 0, q8_post: 0, q10: 0, q12: 0, q13: 0 });
    
    const count = data.length;
    return {
      q3: (sums.q3 / count).toFixed(1),
      q4: (sums.q4 / count).toFixed(1),
      q5: (sums.q5 / count).toFixed(1),
      q6: (sums.q6 / count).toFixed(1),
      q7: (sums.q7 / count).toFixed(1),
      q8_pre: (sums.q8_pre / count).toFixed(1),
      q8_post: (sums.q8_post / count).toFixed(1),
      q10: (sums.q10 / count).toFixed(1),
      q12: (sums.q12 / count).toFixed(1),
      q13: (sums.q13 / count).toFixed(1),
    };
  }, [data]);

  if (!avgData) return <div className="text-center py-10 text-gray-400">目前沒有數據可供分析</div>;

  const confidenceData = [
    { name: '訓前信心', value: parseFloat(avgData.q8_pre) },
    { name: '訓後信心', value: parseFloat(avgData.q8_post) },
  ];

  const radarData = [
    { subject: '角色任務(Q3)', A: parseFloat(avgData.q3), fullMark: 5 },
    { subject: '劇本理解(Q4)', A: parseFloat(avgData.q4), fullMark: 5 },
    { subject: '演出技巧(Q5)', A: parseFloat(avgData.q5), fullMark: 5 },
    { subject: '回饋技巧(Q6)', A: parseFloat(avgData.q6), fullMark: 5 },
    { subject: '講師引導(Q7)', A: parseFloat(avgData.q7), fullMark: 5 },
  ];

  return (
    <>
      <div className="py-12 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <span className="w-2 h-8 bg-orange-500 mr-3 rounded-full"></span>
            量化數據圖表
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 信心成長圖 */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Star size={100} />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">信心的躍升 (1-10分)</h3>
              <p className="text-sm text-gray-400 mb-6">數值視覺化對比</p>
              
              <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={confidenceData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 10]} />
                      <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 14, fontWeight: 'bold'}} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px'}} />
                      <Bar dataKey="value" fill="#F97316" radius={[0, 10, 10, 0]} barSize={40}>
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
              </div>
            </div>

            {/* 核心能力雷達圖 */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lightbulb size={100} />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">五大核心能力指標 (1-5分)</h3>
              <p className="text-sm text-gray-400 mb-6">各項專業指標皆達到高標，顯示培訓成效顯著</p>
              
              <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                      <Radar
                        name="平均得分"
                        dataKey="A"
                        stroke="#10B981"
                        strokeWidth={3}
                        fill="#10B981"
                        fillOpacity={0.2}
                      />
                      <Tooltip contentStyle={{borderRadius: '12px'}} />
                    </RadarChart>
                  </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* 簡單的亮點數據列 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-orange-100 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-orange-600">{avgData.q12}</div>
                <div className="text-xs text-orange-400 mt-1">行政安排滿意度</div>
            </div>
            <div className="bg-white border border-orange-100 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-orange-600">{avgData.q13}</div>
                <div className="text-xs text-orange-400 mt-1">場地教材滿意度</div>
            </div>
            <div className="bg-white border border-green-100 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-green-600">{avgData.q10}</div>
                <div className="text-xs text-green-400 mt-1">價值認同感</div>
            </div>
            <div className="bg-white border border-blue-100 p-4 rounded-xl text-center shadow-sm">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-xs text-blue-400 mt-1">願意持續精進</div>
            </div>
          </div>
        </div>
      </div>

      <InsightsSection avgData={avgData} />
    </>
  );
};

// --- 暖心回饋牆組件 ---
const WallSection = ({ data }) => {
  const [tab, setTab] = useState('touching'); // 'touching' or 'suggestion'

  const getNoteStyle = (index) => {
    const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2'];
    const colors = [
      'bg-yellow-100 text-yellow-900 border-yellow-200', 
      'bg-orange-100 text-orange-900 border-orange-200',
      'bg-rose-100 text-rose-900 border-rose-200',
      'bg-lime-100 text-lime-900 border-lime-200'
    ];
    return {
      rotation: rotations[index % rotations.length],
      color: colors[index % colors.length]
    };
  };

  return (
    <div className="py-16 px-6 relative overflow-hidden" style={{backgroundColor: '#4a3b32'}}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-yellow-100 blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white flex items-center mb-4 md:mb-0 text-shadow-lg">
            <Sparkles className="mr-3 text-yellow-400" />
            學員心聲回饋牆
          </h2>
          
          <div className="bg-white/10 p-1 rounded-full backdrop-blur-sm border border-white/20">
            <button 
              onClick={() => setTab('touching')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${tab === 'touching' ? 'bg-orange-500 text-white shadow-lg' : 'text-orange-100 hover:text-white'}`}
            >
              感觸時刻 (Q14)
            </button>
            <button 
              onClick={() => setTab('suggestion')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${tab === 'suggestion' ? 'bg-orange-500 text-white shadow-lg' : 'text-orange-100 hover:text-white'}`}
            >
              建議回饋 (Q15)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, index) => {
            const content = tab === 'touching' ? item.q14 : item.q15;
            if (!content || content.length < 2 || content === "無" || content === "沒有") return null;

            const style = getNoteStyle(index);

            return (
              <div 
                key={index} 
                className={`transform ${style.rotation} hover:scale-105 hover:rotate-0 transition-all duration-300 hover:z-20`}
              >
                <div className={`${style.color} p-6 h-64 shadow-xl flex flex-col relative`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/30 backdrop-blur-sm rotate-1 shadow-sm"></div>
                  
                  <Quote className="mb-3 opacity-30 w-6 h-6" />
                  <p className="font-handwriting text-lg leading-relaxed flex-grow overflow-y-auto custom-scrollbar">
                    {content}
                  </p>
                  <div className="mt-4 pt-4 border-t border-black/5 text-right text-xs opacity-60 font-medium">
                    學員 #{item.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-center text-white/40 mt-12 text-sm">
          - 每一張便利貼，都是成長的印記 -
        </p>
      </div>
    </div>
  );
};

// --- 主程式 ---
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 您的 Google Apps Script 部署網址
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbyCHejHk-2Ah413tVX3KhhO5CCnxm8m3zZpV5tuZ6A02_bhuD6NUOAKUgrU6RYHWeSm7g/exec';

    fetch(GAS_URL)
      .then(response => {
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        const formattedData = json.map((item, index) => ({
          ...item,
          id: item.id || index + 1, 
          q1: Number(item.q1),
          q2: Number(item.q2),
          q3: Number(item.q3),
          q4: Number(item.q4),
          q5: Number(item.q5),
          q6: Number(item.q6),
          q7: Number(item.q7),
          q8_pre: Number(item.q8_pre),
          q8_post: Number(item.q8_post),
          q9: Number(item.q9),
          q10: Number(item.q10),
          q11: Number(item.q11),
          q12: Number(item.q12),
          q13: Number(item.q13)
        }));
        
        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-orange-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg font-medium">正在為您讀取雲端問卷數據...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-red-500">
        <p className="text-lg font-bold">數據讀取失敗</p>
        <p className="text-sm">{error}</p>
        <p className="text-xs text-gray-500 mt-2">請確認您的 Google Apps Script 是否已部署為「任何人皆可讀取」</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-200">
      <Header count={data.length} />
      <ChartSection data={data} />
      <WallSection data={data} />
      
      <footer className="bg-slate-900 text-gray-500 py-8 text-center text-sm border-t border-white/5">
        <p>© 2025 | 奇美醫院 標準化病人培訓工作坊</p>
        <p className="text-xs mt-1 text-gray-600">數據來源：Google Sheet 即時連動</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        
        body {
          font-family: 'Noto Sans TC', sans-serif;
        }
        
        .font-handwriting {
          font-family: 'Noto Sans TC', cursive;
          font-weight: 500;
        }

        .text-shadow-lg {
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}