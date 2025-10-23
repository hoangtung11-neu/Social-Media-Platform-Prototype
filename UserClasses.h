#pragma once
#include <iostream>
#include <string>
using namespace std;


class User {
protected:
    string username;        
    string email;           
    string privacySetting;  

private:
    string password;        

public:
    User(const string& u, const string& p, const string& e,
         const string& ps = "public")
        : username(u), password(p), email(e), privacySetting(ps) {}

    virtual ~User() {}

    const string& getUsername() const { return username; }
    const string& getEmail() const { return email; }
    const string& getPrivacySetting() const { return privacySetting; }

    void setPrivacySetting(const string& ps) { privacySetting = ps; }

    
    void setPassword(const string& newPass) {
        if (newPass.length() < 6)
            cout << "❌ Password quá ngắn (tối thiểu 6 ký tự)!\n";
        else
            password = newPass;
    }

    bool verifyPassword(const string& input) const {
        return input == password;
    }

    virtual void displayInfo() const {
        cout << "User: " << username << ", Email: " << email << endl;
    }

    virtual string getRole() const = 0;
};


class Admin : public User {
public:
    Admin(const string& u, const string& p, const string& e,
          const string& ps = "public")
        : User(u, p, e, ps) {}

    string getRole() const override { return "Admin"; }

    void deletePost(int postId, const string& author) const {
        cout << "[ADMIN] " << username << " deleted post #" << postId
             << " by " << author << endl;
    }
};


class Moderator : public User {
public:
    Moderator(const string& u, const string& p, const string& e,
              const string& ps = "public")
        : User(u, p, e, ps) {}

    string getRole() const override { return "Moderator"; }

    void hidePost(int postId, const string& reason) const {
        cout << "[MOD] " << username << " hid post #" << postId
             << " (" << reason << ")" << endl;
    }
};


class NormalUser : public User {
private:
    int postCount = 0;

public:
    NormalUser(const string& u, const string& p, const string& e,
               const string& ps = "public")
        : User(u, p, e, ps) {}

    string getRole() const override { return "User"; }

    void createPost(const string& content) {
        cout << "[POST] " << username << " posted: " << content << endl;
        postCount++;
    }

    int getPostCount() const { return postCount; }
};
