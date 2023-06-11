import {useStore} from 'effector-react';
import {Icons} from './icons';
import {globalState} from '../../effector';

export const UpdateNoti = () => {
  const {accessToken} = useStore(globalState.$store);
  globalState.action.notificationAction({accessToken});
};

export const calculateKcal = ({preparations}: any) => {
  let recipeKcal = 0;

  preparations?.map(preparation => {
    recipeKcal =
      recipeKcal +
      (preparation?.ingredient?.kcalRate / 100) * preparation?.quantity;
  });
  return recipeKcal;
};
export const checkTags = tag => {
  switch (tag) {
    case 'SPICY FOOD':
      return {
        icon: Icons.SPICYFOOD,
        advice:
          'Đây là món cay, bạn nên cân nhắc nếu bạn có bệnh lý về dạ dày hoặc bị dị ứng.',
      };
    case 'FASTFOOD':
      return {
        icon: Icons.FASTFOOD,
        advice:
          'Đây là một loại đồ ăn nhanh và nó không có lợi cho sức khỏe, hãy cân nhắc trước khi sử dụng.',
      };
    case 'HEALTHY FOOD':
      return {
        icon: Icons.HEALTHYFOOD,
        advice: 'Đây là thực phẩm rất tốt cho sức khỏe, đừng bỏ lỡ.',
      };
    case 'FATTY FOOD':
      return {
        icon: Icons.FATTYFOOD,
        advice:
          'Đây là thực phẩm có chứa nhiều chất béo, nếu bạn mắc các bệnh về tim mạch hoặc béo phì, hãy hạn chế.',
      };
    case 'ALCOHOL':
      return {
        icon: Icons.ALCOHOL,
        advice:
          'Đây là công thức có sử dụng tới rượu, bia, nếu có bệnh lý về gan, tim mạch, dạ dày... hãy cân nhắc trước khi sử dụng',
      };
    default:
      break;
  }
};
