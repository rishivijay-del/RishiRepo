@IsTest
private class MyIterableTest {
    @IsTest
    static void testIterableForLoop() {
        // Create a list of strings
        List<String> strings = new List<String>{'Hello', 'World'};
        
        // Create an instance of MyIterable
        MyIterable iterable = new MyIterable(strings);
        
        // Iterate over MyIterable instance and debug log the output
        for (String str : iterable) {
            System.debug(str);
        }
    }
    
}