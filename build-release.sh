rm -rf android/app/src/main/res/drawable-*
cd android && ./gradlew clean
cd .. && react-native run-android --configuration=release