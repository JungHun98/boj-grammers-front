export const defaultCode = {
  python: `print("Hello, world")`,
  javascript: `console.log("Hello, world");`,
  java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello world!");
    }
}`,
  cpp: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main(){
    cout << "Hello world!" << endl;
    return 0;
}`,
};
