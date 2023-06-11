import {Image, ScrollView, Share, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeHeader} from '../../components/home-header';
import {Text} from '../../components/common/text/text.component';
import {View} from '../../components/common/view/view.component';
import {Touchable} from '../../components/common/touchable/touchable';
import {Platform} from '../../utils/platform';
import {Icon} from '../../components/common/icon';
import {Icons} from '../../utils/icons';
import useTheme from '../../hooks/useTheme';
import BackButton from '../../components/back-button';
import {calculateKcal, checkTags} from '../../utils/function';
import ModalComponent from '../../components/Modal';

const RecipeDetail = ({route}: any) => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [person, setPerson] = useState(1);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);
  const recipe = route.params;
  console.log('aaaaaaaaaaaaaaaaaa', recipe.preparations);

  const handleCloseModal = () => {
    setStep(0);
    setWarning(false);
    setSuccess(false);
    setShowModal(false);
  };
  const nextStepHandle = () => {
    if (step < recipe.instruction.length) {
      setStep(step + 1);
    }
  };
  const shareLink = async () => {
    await Share.share({
      message: `here check out this delicious recipe, https://yummyrecipe.page.link/${route.params._id}`,
    });
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (recipe.warningTags.length > 0) {
        setWarning(true);
        setShowModal(true);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [recipe.warningTags.length]);
  useEffect(() => {
    if (step === recipe.instruction.length) {
      setSuccess(true);
    }
  }, [recipe.instruction.length, step]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <View
          style={{
            backgroundColor: 'black',
            width: '100%',
            position: 'absolute',
            zIndex: 2,
            height: 70,
            opacity: 0.2,
          }}></View>
        <BackButton color={'#bfbfbf'} />

        <HomeHeader img={route.params.img} />
        <View ph={Platform.SizeScale(20)} mt={Platform.SizeScale(10)} flex={1}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                color="black"
                fontType={theme.fonts.DMSansBoldItalic}
                fontSize={theme.typography.fontSize.L}>
                {recipe.recipeName}
              </Text>
              {recipe.warningTags.map((tag, index) => (
                <Icon
                  icon={checkTags(tag)?.icon}
                  size={1}
                  style={{marginLeft: 10}}
                  key={index}
                />
              ))}
            </View>

            <Touchable
              onPress={() => {
                shareLink();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 6,
                borderWidth: 0.5,
                borderColor: '#328cba',
                padding: 5,
                marginRight: 3,
              }}>
              <Text
                color="#328cba"
                fontType={theme.fonts.DMSansItalic}
                fontSize={theme.typography.fontSize.M}>
                Chia sẻ
              </Text>
              <View ml={5}>
                <Icon icon={Icons.SHARE} size={theme.typography.iconSize.M} />
              </View>
            </Touchable>
          </View>

          <Text
            color="black"
            fontType={theme.fonts.DMSansRegular}
            fontSize={theme.typography.fontSize.S}
            mt={10}
            style={{textAlign: 'justify'}}>
            {showAll ? recipe.desc : `${recipe.desc.slice(0, 100)}...`}
            <TouchableWithoutFeedback
              onPress={() => {
                setShowAll(!showAll);
              }}>
              <Text style={{color: theme.colors.ORANGE}}>
                {showAll ? ' Thu gọn' : ' Xem thêm'}
              </Text>
            </TouchableWithoutFeedback>
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}
              mt={30}>
              <Text
                color={theme.colors.TEXT_GRAY}
                fontType={theme.fonts.DMSansBold}
                fontSize={theme.typography.fontSize.M}>
                Nguyên liệu
              </Text>
              <Text
                color={theme.colors.TEXT_GRAY}
                fontType={theme.fonts.DMSansBold}
                fontSize={theme.typography.fontSize.S}
                style={{width: 30}}>
                {` x${person}`}
              </Text>
              <Touchable
                onPress={() => setPerson(person + 1)}
                style={{backgroundColor: 'red', borderRadius: 2}}>
                <Icon icon={Icons.UP} size={1} />
              </Touchable>
              <Touchable
                onPress={() => {
                  if (person > 1) {
                    setPerson(person - 1);
                  }
                }}
                style={{
                  backgroundColor: 'red',
                  borderRadius: 2,
                  marginLeft: 5,
                }}>
                <Icon icon={Icons.DOWN} size={1} />
              </Touchable>
            </View>
            <Text
              color={theme.colors.TEXT_GRAY}
              fontType={theme.fonts.DMSansBold}
              fontSize={theme.typography.fontSize.M}
              mt={30}>
              Năng lượng
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // borderBottomWidth: 1,
              // borderBottomColor: '#ffcc52',
            }}
            mt={10}>
            <View
              style={{
                borderRightWidth: 1,
                flex: 1,
                borderRightColor: '#ffcc52',
                justifyContent: 'center',
              }}>
              {recipe.preparations.map((preparation, index) => (
                <Text
                  color="black"
                  key={index}
                  fontType={theme.fonts.DMSansRegular}
                  fontSize={theme.typography.fontSize.S}>
                  {`${preparation?.ingredient.foodName}  -  ${
                    preparation?.quantity * person
                  }${preparation?.ingredient.unit}`}
                </Text>
              ))}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                flex: 1,
                paddingVertical: Platform.SizeScale(30),
              }}>
              <Text
                color={'black'}
                fontType={theme.fonts.DMSansRegular}
                fontSize={theme.typography.fontSize.S}>
                {`~~${calculateKcal({
                  preparations: recipe.preparations,
                })} kcal cho 1 phần`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Touchable
        style={{
          alignSelf: 'center',
          padding: 8,
          backgroundColor: theme.colors.ORANGE,
          borderRadius: 5,
          marginTop: Platform.SizeScale(30),
        }}
        onPress={() => setShowModal(true)}>
        <Text
          style={{color: theme.colors.WHITE}}
          color="black"
          fontSize={theme.typography.fontSize.S}>
          Bắt đầu
        </Text>
      </Touchable>
      {showModal ? (
        <ModalComponent
          recipe={recipe}
          step={step}
          nextStepHandle={nextStepHandle}
          handleCloseModal={handleCloseModal}
          warning={warning}
          success={success}
        />
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default RecipeDetail;
