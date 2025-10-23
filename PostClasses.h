#pragma once
#include <iostream>
#include <string>
#include <ctime>
using namespace std;


class Post {
protected:
    string author;
    string timestamp;

private:
    string content;  

    
    string getCurrentTime() const {
        time_t now = time(0);
        char buf[80];
        strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", localtime(&now));
        return string(buf);
    }

public:
   
    Post(string content, string author)
        : content(content), author(author) {
        timestamp = getCurrentTime();
    }

    virtual ~Post() {}

    
    string getContent() const { return content; }
    string getAuthor() const { return author; }
    string getTimestamp() const { return timestamp; }

    void setContent(const string& newContent) {
        if (newContent.empty())
            cout << "❌ Nội dung bài viết không được để trống!" << endl;
        else
            content = newContent;
    }

    
    virtual void display() const = 0; 
    virtual void share() const {
        cout << author << " vừa chia sẻ một bài đăng." << endl;
    }
};


class TextPost : public Post {
private:
    string textFormat;

public:
    TextPost(string content, string author, string format)
        : Post(content, author), textFormat(format) {}

    void display() const override {
        cout << "----- TEXT POST -----" << endl;
        cout << "Tác giả: " << author << endl;
        cout << "Định dạng: " << textFormat << endl;
        cout << "Nội dung: " << getContent() << endl;
        cout << "Thời gian: " << timestamp << endl;
    }

    void share() const override {
        cout << author << " chia sẻ bài viết dạng văn bản." << endl;
    }
};


class ImagePost : public Post {
private:
    string imageUrl;
    string caption;

public:
    ImagePost(string content, string author, string url)
        : Post(content, author), imageUrl(url), caption(content) {}

    void display() const override {
        cout << "----- IMAGE POST -----" << endl;
        cout << "Tác giả: " << author << endl;
        cout << "Chú thích: " << caption << endl;
        cout << "Hình ảnh: " << imageUrl << endl;
        cout << "Thời gian: " << timestamp << endl;
    }

    void share() const override {
        cout << author << " chia sẻ bài đăng hình ảnh: " << imageUrl << endl;
    }
};


class VideoPost : public Post {
private:
    string videoUrl;
    int duration; 

public:
    VideoPost(string content, string author, string url, int dur)
        : Post(content, author), videoUrl(url), duration(dur) {}

    void display() const override {
        cout << "----- VIDEO POST -----" << endl;
        cout << "Tác giả: " << author << endl;
        cout << "Mô tả: " << getContent() << endl;
        cout << "Video: " << videoUrl << endl;
        cout << "Thời lượng: " << duration << " giây" << endl;
        cout << "Thời gian: " << timestamp << endl;
    }

    void share() const override {
        cout << author << " chia sẻ bài đăng video: " << videoUrl << endl;
    }
};
