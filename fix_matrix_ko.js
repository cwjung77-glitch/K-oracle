const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');

c = c.replace(/const months = \['Jan','Feb'/g, "const isKo = lang === 'ko';\n              const months = isKo ? ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] : ['January','February'");
c = c.replace(/const elements = \['Wood', 'Fire', 'Earth', 'Metal', 'Water'\];/g, "const elements = isKo ? ['목(Wood)', '화(Fire)', '토(Earth)', '금(Metal)', '수(Water)'] : ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];");

c = c.replace(/const wealthOps = \[([^\]]+)\];/, `const wealthOps = isKo ? [
                m1 + '에 "횡재수"가 강하게 들어옵니다. 월급 외의 투자 수익, 사이드 프로젝트의 성공, 또는 부동산 자산의 급격한 상승이 예상됩니다.',
                m1 + '에 "금여성"이 빛납니다. 잊고 있던 자산이나 숨겨진 투자처에서 폭발적인 수익이 발생할 수 있습니다.',
                m1 + '에 강력한 "귀인"이 나타나 당신의 수입을 배가시킬 매우 수익성 높은 제안을 할 것입니다.'
              ] : [$1];`);
              
c = c.replace(/const wealthDans = \[([^\]]+)\];/, `const wealthDans = isKo ? [
                m2 + '에 "겁재"가 숨어 있습니다. 믿었던 지인이 돈을 빌려달라고 하거나 너무 좋은 조건의 동업을 제안할 수 있습니다. 단호하게 거절하십시오.',
                m2 + '에는 "재물 손실"의 구간입니다. 이 시기에는 충동적인 명품 소비나 고위험 코인 투자를 절대 피하십시오.',
                m2 + '에 예상치 못한 세금이나 법률 비용이 발생할 수 있습니다. 모든 계약서를 두 번 확인하고 회계를 엄격히 관리하십시오.'
              ] : [$1];`);

c = c.replace(/const romOps = \[([^\]]+)\];/, `const romOps = isKo ? [
                m3 + '에 모두가 부러워하는 "도화살"이 강하게 발동합니다. 가만히 있어도 사람들을 끌어당기는 치명적인 매력을 발산할 것입니다.',
                m3 + '에 "홍란성"이 뜹니다. 가벼운 만남이 운명적이고 영혼이 통하는 깊은 관계로 발전할 수 있습니다.',
                m3 + '에 당신의 카리스마 에너지가 최고조에 달합니다. 비즈니스 네트워크를 확장하고 고부가가치 고객을 유치할 완벽한 타이밍입니다.'
              ] : [$1];`);
              
c = c.replace(/const romDans = \[([^\]]+)\];/, `const romDans = isKo ? [
                '당신의 ' + elem + ' 에너지가 너무 압도적이라 타인에게 지나치게 강압적이거나 통제하려 드는 것처럼 보일 수 있습니다. 경청하는 연습을 하십시오.',
                '일시적으로 "고신살(외로움)"의 그림자가 드리워집니다. 연인과 단절감을 느낄 수 있으니 열린 소통으로 간극을 메우십시오.',
                '과거의 연인이나 독이 되는 직장 동료가 다시 당신의 삶에 끼어들려 할 수 있습니다. 당신의 오라를 보호하기 위해 에너지를 단호히 끊어내십시오.'
              ] : [$1];`);
              
c = c.replace(/<h4 className="text-2xl font-bold text-white mb-4">Wealth & Career Matrix<\/h4>/, `<h4 className="text-2xl font-bold text-white mb-4">{isKo ? '재물 & 커리어 매트릭스' : 'Wealth & Career Matrix'}</h4>`);
c = c.replace(/<h4 className="text-2xl font-bold text-white mb-4">Romance & Network<\/h4>/, `<h4 className="text-2xl font-bold text-white mb-4">{isKo ? '연애 & 인맥 매트릭스' : 'Romance & Network'}</h4>`);
c = c.replace(/<strong>The Opportunity:<\/strong>/g, `<strong>{isKo ? '기회:' : 'The Opportunity:'}</strong>`);
c = c.replace(/<strong>The Danger:<\/strong>/g, `<strong>{isKo ? '위험:' : 'The Danger:'}</strong>`);

fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
