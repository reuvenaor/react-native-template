# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep our interfaces so they can be used by other applications
# -keep public class com.mycompany.myapp.api.* {
#     public protected *;
# }

# Hermes
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# React Native
# Keep original member names of JS-invokable methods.
-keepclassmembers class * extends com.facebook.react.bridge.BaseJavaModule {
  @com.facebook.react.bridge.ReactMethod
  public <methods>;
}
-keepclassmembers class * extends com.facebook.react.bridge.JavaScriptModule {
  public <methods>;
}
-keepclassmembers class * {
  @com.facebook.react.uimanager.UIProp
  public <methods>;
}
-keepclassmembers class * {
  @com.facebook.react.uimanager.UIPropGroup
  public <methods>;
}

# OkHttp3
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.internal.publicsuffix.PublicSuffixDatabase { *; }
-dontwarn com.squareup.okhttp.**
-dontwarn okio.**
-dontwarn javax.annotation.**

# Flipper
-keep class com.facebook.flipper.** { *; }

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Do not warn about JSI modules that may be missing.
-dontwarn com.facebook.react.jsi.**

# Keep missing classes
-dontwarn sun.misc.Cleaner
-keep class sun.misc.** { *; }
-dontwarn com.sun.xml.internal.**
-dontwarn pl.edu.icm.jlargearrays.**
-keep class pl.edu.icm.jlargearrays.** { *; }
