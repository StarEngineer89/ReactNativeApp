import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import { HStack } from 'react-native-stacks';
import { images } from 'src/constants';
import { isTablet } from 'src/functions';

const size = isTablet() ? 25 : 16;

const RateView = ({ value, onPress, ...props }) => {
  const [defaultRating, setdefaultRating] = useState(value);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <HStack spacing={5} {...props}>
      {maxRating.map((item, key) => {
        return (
          <Pressable
            key={item}
            onPress={() => {
              setdefaultRating(item);
              onPress(item);
            }}
          >
            <Image
              source={item <= defaultRating ? images.FILLED_STAR : images.UNFILLED_STAR}
              style={{ width: size, height: size }}
            />
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default RateView;
