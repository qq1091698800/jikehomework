CREATE SCHEMA `jike_news_160831` DEFAULT CHARACTER SET utf8 ;
use `jike_news_160831`;

CREATE TABLE `newscategory` (
  `CategoryId` INT NOT NULL AUTO_INCREMENT,
  `CategoryName` VARCHAR(45) NULL,
  PRIMARY KEY (`CategoryId`) )
COMMENT = '新闻分类表'
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `news` (
  `NewsId` INT NOT NULL AUTO_INCREMENT,
  `CategoryId` INT NOT NULL,
  `NewsTitle` VARCHAR(100) NULL,
  `NewsImg` VARCHAR(200) NULL,
  `NewsContent` text NULL,
  `AddTime` DATE NULL,
  PRIMARY KEY (`NewsId`) )
COMMENT = '新闻表'
DEFAULT CHARACTER SET = utf8;
  
/*加入新闻分类内容*/
insert into `newscategory`(CategoryName)values('精选');
insert into `newscategory`(CategoryName)values('百家');
insert into `newscategory`(CategoryName)values('本地');
insert into `newscategory`(CategoryName)values('娱乐');
insert into `newscategory`(CategoryName)values('社会');
insert into `newscategory`(CategoryName)values('军事');

/*加入新闻内容*/
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(1,'精选1-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic1.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(1,'精选2-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic1.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-13');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(1,'精选3-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic1.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-14');

INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(2,'百家1-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic2.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-11');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(2,'百家2-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic2.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(2,'百家3-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic2.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-13');

INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(3,'本地1-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic3.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-5-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(3,'本地2-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic3.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-6-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(3,'本地3-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic3.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-7-12');

INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(4,'娱乐1-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic1.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-1-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(4,'娱乐2-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic1.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-2-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(4,'娱乐3-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic1.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-3-12');

INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(5,'社会1-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic2.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-4-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(5,'社会2-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic2.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-5-12');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(5,'社会3-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic2.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-6-12');

INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(6,'军事1-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic3.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-22');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(6,'军事2-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic3.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-23');
INSERT INTO `news`(`CategoryId`,`NewsTitle`,`NewsImg`,`NewsContent`,`AddTime`)VALUES
(6,'军事3-我和度秘聊了聊张纪中婚变罗生门：到底谁更无耻','npic3.jpg','首富近日频频露面，除了上《鲁豫有约》，8月25日在万达集团举办一个论坛上，还作出题为《把海外消费拉回国》的演讲。 ','2016-8-31');

