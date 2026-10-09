const { Solar } = require('lunar-javascript');

// Mapping Chinese Hanja to Korean K-Oracle Terminology
const STEMS = {
  '甲': 'Gap (Wood)',
  '乙': 'Eul (Wood)',
  '丙': 'Byeong (Fire)',
  '丁': 'Jeong (Fire)',
  '戊': 'Mu (Earth)',
  '己': 'Gi (Earth)',
  '庚': 'Gyeong (Metal)',
  '辛': 'Sin (Metal)',
  '壬': 'Im (Water)',
  '癸': 'Gye (Water)'
};

const BRANCHES = {
  '子': 'Ja (Rat / Water)',
  '丑': 'Chuk (Ox / Earth)',
  '寅': 'In (Tiger / Wood)',
  '卯': 'Myo (Rabbit / Wood)',
  '辰': 'Jin (Dragon / Earth)',
  '巳': 'Sa (Snake / Fire)',
  '午': 'Oh (Horse / Fire)',
  '未': 'Mi (Goat / Earth)',
  '申': 'Sin (Monkey / Metal)',
  '酉': 'Yu (Rooster / Metal)',
  '戌': 'Sul (Dog / Earth)',
  '亥': 'Hae (Pig / Water)'
};

function getKoreanSaju(year, month, day, hour, minute) {
  try {
    // Fallback to 12:00 PM if time is not provided or invalid
    const h = (hour !== undefined && hour !== null && !isNaN(hour)) ? parseInt(hour) : 12;
    const m = (minute !== undefined && minute !== null && !isNaN(minute)) ? parseInt(minute) : 0;
    
    const solar = Solar.fromYmdHms(parseInt(year), parseInt(month), parseInt(day), h, m, 0);
    const lunar = solar.getLunar();
    const bazi = lunar.getEightChar();
    
    // Extract Chinese characters
    const yearGan = bazi.getYearGan();
    const yearZhi = bazi.getYearZhi();
    
    const monthGan = bazi.getMonthGan();
    const monthZhi = bazi.getMonthZhi();
    
    const dayGan = bazi.getDayGan();
    const dayZhi = bazi.getDayZhi();
    
    const timeGan = bazi.getTimeGan();
    const timeZhi = bazi.getTimeZhi();
    
    return {
      yearPillar: `${STEMS[yearGan]} / ${BRANCHES[yearZhi]}`,
      monthPillar: `${STEMS[monthGan]} / ${BRANCHES[monthZhi]}`,
      dayPillar: `${STEMS[dayGan]} / ${BRANCHES[dayZhi]}`,
      hourPillar: `${STEMS[timeGan]} / ${BRANCHES[timeZhi]}`,
      dayMaster: STEMS[dayGan],
      raw: {
        year: yearGan + yearZhi,
        month: monthGan + monthZhi,
        day: dayGan + dayZhi,
        time: timeGan + timeZhi
      }
    };
  } catch (error) {
    console.error("Saju Calculation Error:", error);
    return null;
  }
}

module.exports = { getKoreanSaju };
