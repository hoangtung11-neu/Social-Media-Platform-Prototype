#include "UserClasses.h"
#include "PostClasses.h"
#include "CommentMessage.h"
#include <vector>
#include <memory>

int main() {
    
    Admin admin("admin1", "admin123", "admin@example.com");
    Moderator mod("moderator1", "mod123", "mod@example.com");
    NormalUser user1("john_doe", "john123", "john@example.com");
    NormalUser user2("jane_doe", "jane123", "jane@example.com");

    cout << "\n===== User Information =====" << endl;
    admin.displayInfo();
    mod.displayInfo();
    user1.displayInfo();
    user2.displayInfo();

    
    vector<unique_ptr<Post>> posts;
    
    
    posts.push_back(make_unique<TextPost>(
        "Hello, this is my first post!",
        "john_doe",
        "plain_text"
    ));

    
    posts.push_back(make_unique<ImagePost>(
        "My vacation photo",
        "jane_doe",
        "vacation.jpg"
    ));

    
    posts.push_back(make_unique<VideoPost>(
        "Check out my new video!",
        "john_doe",
        "video.mp4",
        120
    ));

    cout << "\n===== Posts Display =====" << endl;
    for (const auto& post : posts) {
        post->display();
        post->share();
        cout << endl;
    }

    
    vector<Comment> comments;
    comments.push_back(Comment(1, "Great post!", "jane_doe", 1));
    comments.push_back(Comment(2, "Nice photo!", "john_doe", 2));

    cout << "\n===== Comments Display =====" << endl;
    for (const auto& comment : comments) {
        comment.display();
    }

    
    vector<Message> messages;
    messages.push_back(Message(1, "Hey, how are you?", "john_doe", "jane_doe"));
    messages.push_back(Message(2, "I'm good, thanks!", "jane_doe", "john_doe"));

    cout << "\n===== Messages Display =====" << endl;
    for (const auto& message : messages) {
        message.display();
    }

    
    cout << "\n===== Moderation Actions =====" << endl;
    mod.hidePost(1, "Inappropriate content");
    admin.deletePost(2, "john_doe");

    
    cout << "\n===== Privacy Settings =====" << endl;
    user1.setPrivacySetting("private");
    cout << "User1's privacy setting: " << user1.getPrivacySetting() << endl;

    
    cout << "\n===== Password Verification =====" << endl;
    string testPassword = "john123";
    cout << "Verifying password for john_doe: " 
         << (user1.verifyPassword(testPassword) ? "Success" : "Failed") << endl;

    return 0;
}
