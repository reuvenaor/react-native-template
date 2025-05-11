## Fixes

### Fix for Kotlin version mismatch in react-native-executorch

The react-native-executorch module was using Kotlin 1.7.0, but the project is using Kotlin 2.0.21, causing compilation errors. The following changes were made to fix this issue:

1. Updated the Kotlin version in `node_modules/react-native-executorch/android/build.gradle`:
```gradle
// Buildscript is evaluated before everything else so we can't use getExtOrDefault
def kotlin_version = rootProject.ext.has("kotlinVersion") ? rootProject.ext.get("kotlinVersion") : "2.0.21"
```

And later in the same file:
```gradle
def kotlin_version = rootProject.ext.has("kotlinVersion") ? rootProject.ext.get("kotlinVersion") : "2.0.21"
```

2. Updated the Kotlin version in `node_modules/react-native-executorch/android/gradle.properties`:
```properties
RnExecutorch_kotlinVersion=2.0.21
```

3. Fixed a Kotlin syntax issue in `node_modules/react-native-executorch/android/src/main/java/com/swmansion/rnexecutorch/utils/ArrayUtils.kt`:
```kotlin
// Changed from:
mapArray[i] = input.getMap(i).toHashMap() as Map<String, V>
// To:
mapArray[i] = input.getMap(i)?.toHashMap() as Map<String, V>
```

This was needed because in Kotlin 2.0.21, you must use the safe call operator (`?.`) when calling methods on nullable receivers.

After making these changes, the project builds successfully.

## Review Changes

### Before and After Code Comparison

#### 1. node_modules/react-native-executorch/android/build.gradle (before)
```gradle
// Buildscript is evaluated before everything else so we can't use getExtOrDefault
def kotlin_version = rootProject.ext.has("kotlinVersion") ? rootProject.ext.get("kotlinVersion") : project.properties["RnExecutorch_kotlinVersion"]

// ...

def kotlin_version = rootProject.ext.has("kotlinVersion") ? rootProject.ext.get("kotlinVersion") : project.properties["RnExecutorch_kotlinVersion"]
```

#### 1. node_modules/react-native-executorch/android/build.gradle (after)
```gradle
// Buildscript is evaluated before everything else so we can't use getExtOrDefault
def kotlin_version = rootProject.ext.has("kotlinVersion") ? rootProject.ext.get("kotlinVersion") : "2.0.21"

// ...

def kotlin_version = rootProject.ext.has("kotlinVersion") ? rootProject.ext.get("kotlinVersion") : "2.0.21"
```

#### 2. node_modules/react-native-executorch/android/gradle.properties (before)
```properties
RnExecutorch_kotlinVersion=1.7.0
```

#### 2. node_modules/react-native-executorch/android/gradle.properties (after)
```properties
RnExecutorch_kotlinVersion=2.0.21
```

#### 3. ArrayUtils.kt (before)
```kotlin
fun <V> createMapArray(input: ReadableArray): Array<Map<String, V>> {
  val mapArray = Array<Map<String, V>>(input.size()) { mapOf() }
  for (i in 0 until input.size()) {
    mapArray[i] = input.getMap(i).toHashMap() as Map<String, V>
  }
  return mapArray
}
```

#### 3. ArrayUtils.kt (after)
```kotlin
fun <V> createMapArray(input: ReadableArray): Array<Map<String, V>> {
  val mapArray = Array<Map<String, V>>(input.size()) { mapOf() }
  for (i in 0 until input.size()) {
    mapArray[i] = input.getMap(i)?.toHashMap() as Map<String, V>
  }
  return mapArray
}
```


