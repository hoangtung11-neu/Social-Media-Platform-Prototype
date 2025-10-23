#pragma once
#include <iostream>
#include <string>
#include <chrono>
#include <iomanip>
#include <sstream>
using namespace std;


string getCurrentTimeAsString() {
    auto now = chrono::system_clock::now();
    time_t now_time_t = chrono::system_clock::to_time_t(now);
    tm now_tm;
    localtime_s(&now_tm, &now_time_t);

    stringstream ss;
    ss << put_time(&now_tm, "%H:%M:%S - %d/%m/%Y");
    return ss.str();
}


class Comment {
private:
    long commentID;
    string content;
    string authorUsername;
    long postID;
    string timestamp;

public:
    Comment(long id, const string& commentText, const string& author, long onPostID)
        : commentID(id), content(commentText), authorUsername(author), postID(onPostID) {
        timestamp = getCurrentTimeAsString();
    }

    
    void setContent(const string& newContent) {
        if (newContent.empty()) {
            cout << "❌ Nội dung bình luận không được để trống!" << endl;
        } else {
            content = newContent;
        }
    }

    string getAuthor() const { return authorUsername; }
    string getContent() const { return content; }

    void display() const {
        cout << ">> " << authorUsername << " bình luận lúc " << timestamp << ":\n";
        cout << "   \"" << content << "\"" << endl;
    }
};


class Message {
private:
    long messageID;
    string sender;
    string receiver;
    string content;
    string timestamp;

public:
    Message(long id, const string& messageBody, const string& sentBy, const string& sentTo)
        : messageID(id), sender(sentBy), receiver(sentTo), content(messageBody) {
        timestamp = getCurrentTimeAsString();
    }

    
    void setContent(const string& newMessage) {
        if (newMessage.empty()) {
            cout << "❌ Tin nhắn không được để trống!" << endl;
        } else {
            content = newMessage;
        }
    }

    string getSender() const { return sender; }
    string getReceiver() const { return receiver; }

    void display() const {
        cout << "\n--- TIN NHẮN MỚI ---" << endl;
        cout << "Từ: " << sender << endl;
        cout << "Đến: " << receiver << endl;
        cout << "Lúc: " << timestamp << endl;
        cout << "--------------------" << endl;
        cout << content << endl;
        cout << "--------------------" << endl;
    }
};
