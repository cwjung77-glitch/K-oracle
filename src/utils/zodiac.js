import { Solar } from 'lunar-javascript';

const HEAVENLY_STEMS_EN = {
  '甲': 'Jia (Yang Wood)', '乙': 'Yi (Yin Wood)',
  '丙': 'Bing (Yang Fire)', '丁': 'Ding (Yin Fire)',
  '戊': 'Wu (Yang Earth)', '己': 'Ji (Yin Earth)',
  '庚': 'Geng (Yang Metal)', '辛': 'Xin (Yin Metal)',
  '壬': 'Ren (Yang Water)', '癸': 'Gui (Yin Water)'
};

const EARTHLY_BRANCHES_EN = {
  '子': 'Zi (Rat)', '丑': 'Chou (Ox)', '寅': 'Yin (Tiger)', '卯': 'Mao (Rabbit)',
  '辰': 'Chen (Dragon)', '巳': 'Si (Snake)', '午': 'Wu (Horse)', '未': 'Wei (Goat)',
  '申': 'Shen (Monkey)', '酉': 'You (Rooster)', '戌': 'Xu (Dog)', '亥': 'Hai (Pig)'
};

export function getSajuFromDate(dateString) {
  // dateString format: "YYYY-MM-DD"
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  // Create Solar date
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const bazi = lunar.getEightChar();

  const yearGan = bazi.getYearGan();
  const yearZhi = bazi.getYearZhi();
  const monthGan = bazi.getMonthGan();
  const monthZhi = bazi.getMonthZhi();
  const dayGan = bazi.getDayGan();
  const dayZhi = bazi.getDayZhi();

  return {
    year: {
      stem: HEAVENLY_STEMS_EN[yearGan] || yearGan,
      branch: EARTHLY_BRANCHES_EN[yearZhi] || yearZhi,
      hanja: `${yearGan}${yearZhi}`
    },
    month: {
      stem: HEAVENLY_STEMS_EN[monthGan] || monthGan,
      branch: EARTHLY_BRANCHES_EN[monthZhi] || monthZhi,
      hanja: `${monthGan}${monthZhi}`
    },
    day: {
      stem: HEAVENLY_STEMS_EN[dayGan] || dayGan,
      branch: EARTHLY_BRANCHES_EN[dayZhi] || dayZhi,
      hanja: `${dayGan}${dayZhi}`
    }
  };
}
