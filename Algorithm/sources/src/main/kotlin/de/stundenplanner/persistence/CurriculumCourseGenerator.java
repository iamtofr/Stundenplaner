/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package de.stundenplanner.persistence;

import de.stundenplanner.domain.*;
import org.optaplanner.examples.common.app.CommonApp;
import org.optaplanner.examples.common.app.LoggingMain;
import org.optaplanner.examples.common.persistence.StringDataGenerator;
import org.optaplanner.examples.curriculumcourse.domain.Curriculum;
import org.optaplanner.examples.curriculumcourse.domain.UnavailablePeriodPenalty;
import org.optaplanner.persistence.common.api.domain.solution.SolutionFileIO;
import org.optaplanner.persistence.xstream.impl.domain.solution.XStreamSolutionFileIO;

import java.io.File;
import java.math.BigInteger;
import java.util.*;
import java.util.stream.Collectors;

import static de.stundenplanner.app.CurriculumCourseAppKt.DATA_DIR_NAME;
import static org.optaplanner.examples.common.persistence.AbstractSolutionImporter.getFlooredPossibleSolutionSize;

public class CurriculumCourseGenerator extends LoggingMain {

  private static final int DAY_LIST_SIZE = 5;
  private static final int TIMESLOT_LIST_SIZE = 7;
  private static final int PERIOD_LIST_SIZE = DAY_LIST_SIZE * TIMESLOT_LIST_SIZE - TIMESLOT_LIST_SIZE + 4;

  public static void main(String[] args) {
    CurriculumCourseGenerator generator = new CurriculumCourseGenerator();
    generator.writeCourseSchedule(200, 8);
    generator.writeCourseSchedule(400, 16);
    generator.writeCourseSchedule(800, 32);
  }

  private final int[] roomCapacityOptions = {
    20,
    25,
    30,
    40,
    50
  };

  private final String[] courseCodes = new String[]{
    "Math",
    "Chemistry",
    "Physics",
    "Geography",
    "Biology",
    "History",
    "English",
    "Spanish",
    "French",
    "German",
    "ICT",
    "Economics",
    "Psychology",
    "Art",
    "Music"};

  private final StringDataGenerator teacherNameGenerator = StringDataGenerator.buildFullNames();

  protected final SolutionFileIO<CourseSchedule> solutionFileIO;
  protected final File outputDir;

  protected Random random;

  public CurriculumCourseGenerator() {
    solutionFileIO = new XStreamSolutionFileIO<>(CourseSchedule.class);
    outputDir = new File(CommonApp.determineDataDir(DATA_DIR_NAME), "unsolved");
  }

  private void writeCourseSchedule(int lectureListSize, int curriculumListSize) {
    int courseListSize = lectureListSize * 2 / 9 + 1;
    int teacherListSize = courseListSize / 3 + 1;
    int roomListSize = lectureListSize * 2 / PERIOD_LIST_SIZE;
    String fileName = determineFileName(lectureListSize, PERIOD_LIST_SIZE, roomListSize);
    File outputFile = new File(outputDir, fileName + ".xml");
    CourseSchedule schedule = createCourseSchedule(fileName, teacherListSize, curriculumListSize, courseListSize, lectureListSize, roomListSize);
    solutionFileIO.write(schedule, outputFile);
    logger.info("Saved: {}", outputFile);
  }

  private String determineFileName(int lectureListSize, int periodListSize, int roomListSize) {
    return lectureListSize + "lectures-" + periodListSize + "periods-" + roomListSize + "rooms";
  }

  public CourseSchedule createCourseSchedule(String fileName, int teacherListSize, int curriculumListSize, int courseListSize, int lectureListSize, int roomListSize) {
    random = new Random(37);
    CourseSchedule schedule = new CourseSchedule();
    schedule.setId(0L);

    createDayList(schedule);
    createTimeslotList(schedule);
    createPeriodList(schedule);
    createTeacherList(schedule, teacherListSize);
    createCourseList(schedule, courseListSize);
    createLectureList(schedule, lectureListSize);
    createRoomList(schedule, roomListSize);
    createCurriculumList(schedule, curriculumListSize);
    createUnavailablePeriodPenaltyList(schedule);

    int possibleForOneLectureSize = schedule.getPeriods().size() * schedule.getRooms().size();
    BigInteger possibleSolutionSize = BigInteger.valueOf(possibleForOneLectureSize).pow(
      schedule.getLectures().size());
    logger.info("CourseSchedule {} has {} teachers, {} curricula, {} courses, {} lectures," +
        " {} periods, {} rooms and {} unavailable period constraints with a search space of {}.",
      fileName,
      schedule.getTeachers().size(),
      schedule.getCurriculumList().size(),
      schedule.getCourses().size(),
      schedule.getLectures().size(),
      schedule.getPeriods().size(),
      schedule.getRooms().size(),
      schedule.getUnavailablePeriodPenaltyList().size(),
      getFlooredPossibleSolutionSize(possibleSolutionSize));
    return schedule;
  }

  private void createDayList(CourseSchedule schedule) {
    List<Day> dayList = new ArrayList<>(DAY_LIST_SIZE);
    for (int i = 0; i < DAY_LIST_SIZE; i++) {
      Day day = new Day(i, new ArrayList<>(TIMESLOT_LIST_SIZE));
      day.setId((long) i);
      dayList.add(day);
    }
    schedule.setDayList(dayList);
  }

  private void createTimeslotList(CourseSchedule schedule) {
    List<TimeSlot> timeSlotList = new ArrayList<>(TIMESLOT_LIST_SIZE);
    for (int i = 0; i < TIMESLOT_LIST_SIZE; i++) {
      TimeSlot timeSlot = new TimeSlot(i);
      timeSlot.setId((long) i);
      timeSlotList.add(timeSlot);
    }
    schedule.setTimeSlotList(timeSlotList);
  }

  private void createPeriodList(CourseSchedule schedule) {
    List<Period> periodList = new ArrayList<>(schedule.getDayList().size() * schedule.getTimeSlotList().size());
    long periodId = 0L;
    for (Day day : schedule.getDayList()) {
      for (TimeSlot timeSlot : schedule.getTimeSlotList()) {
        if (day.getDayIndex() == 2 && timeSlot.getTimeSlotIndex() >= 4) {
          // No lectures Wednesday afternoon
          continue;
        }
        Period period = new Period(day, timeSlot);
        period.setId(periodId);
        periodId++;
        day.getPeriodList().add(period);
        periodList.add(period);
      }
    }
    schedule.setPeriods(periodList);
  }

  private void createTeacherList(CourseSchedule schedule, int teacherListSize) {
    List<Teacher> teacherList = new ArrayList<>(teacherListSize);
    teacherNameGenerator.predictMaximumSizeAndReset(teacherListSize);
    for (int i = 0; i < teacherListSize; i++) {
      Teacher teacher = new Teacher(teacherNameGenerator.generateNextValue());
      teacher.setId((long) i);
      teacherList.add(teacher);
    }
    schedule.setTeachers(teacherList);
  }

  private void createCourseList(CourseSchedule schedule, int courseListSize) {
    List<Teacher> teacherList = schedule.getTeachers();
    List<Course> courseList = new ArrayList<>(courseListSize);
    Set<String> codeSet = new HashSet<>();
    for (int i = 0; i < courseListSize; i++) {
      String code = (i < courseCodes.length * 2)
        ? courseCodes[i % courseCodes.length]
        : courseCodes[random.nextInt(courseCodes.length)];
      StringDataGenerator codeSuffixGenerator = new StringDataGenerator("")
        .addAToZPart(true, 0);
      if (courseListSize >= courseCodes.length) {
        String codeSuffix = codeSuffixGenerator.generateNextValue();
        while (codeSet.contains(code + codeSuffix)) {
          codeSuffix = codeSuffixGenerator.generateNextValue();
        }
        code = code + codeSuffix;
        codeSet.add(code);
      }
      Teacher teacher = (i < teacherList.size() * 2)
        ? teacherList.get(i % teacherList.size())
        : teacherList.get(random.nextInt(teacherList.size()));
      Course course = new Course(code, teacher, new ArrayList<>(), 0, 5, 0);
      course.setId((long) i);
      course.setCurriculumList(new ArrayList<>());
      courseList.add(course);
    }
    schedule.setCourses(courseList);
  }

  private void createLectureList(CourseSchedule schedule, int lectureListSize) {
    List<Course> courseList = schedule.getCourses();
    List<Lecture> lectureList = new ArrayList<>(lectureListSize);
    for (int i = 0; i < lectureListSize; i++) {
      Course course = (i < courseList.size() * 2)
        ? courseList.get(i % courseList.size())
        : courseList.get(random.nextInt(courseList.size()));
      Lecture lecture = new Lecture();
      lecture.setId((long) i);
      lecture.setCourse(course);
      lecture.setLectureIndexInCourse(course.getLectureSize());
      course.setLectureSize(course.getLectureSize() + 1);
      lectureList.add(lecture);
    }
    schedule.setLectures(lectureList);

  }

  private void createRoomList(CourseSchedule schedule, int roomListSize) {
    List<Room> roomList = new ArrayList<>(roomListSize);
    for (int i = 0; i < roomListSize; i++) {
      String code = "R" + ((i / 50 * 100) + 1 + i);
      int capacity = roomCapacityOptions[random.nextInt(roomCapacityOptions.length)];
      Room room = new Room(code, capacity);
      room.setId((long) i);
      roomList.add(room);
    }
    schedule.setRooms(roomList);
  }

  private void createCurriculumList(CourseSchedule schedule, int curriculumListSize) {
    int maximumCapacity = schedule.getRooms().stream().mapToInt(Room::getSeats).max().getAsInt();
    List<Course> courseList = schedule.getCourses();
    List<Curriculum> curriculumList = new ArrayList<>(curriculumListSize);
    StringDataGenerator codeGenerator = new StringDataGenerator("")
      .addAToZPart(true, 0).addAToZPart(false, 1).addAToZPart(false, 1).addAToZPart(false, 1);
    codeGenerator.predictMaximumSizeAndReset(curriculumListSize);
    for (int i = 0; i < curriculumListSize; i++) {
      Curriculum curriculum = new Curriculum("Group " + codeGenerator.generateNextValue());
      curriculum.setId((long) i);
      // The studentSize is more likely to be 15 than 5 or 25
      int studentSize = 5 + random.nextInt(10) + random.nextInt(10);

      List<Course> courseSubList = courseList.stream()
        .filter(course -> course.getStudentSize() + studentSize < maximumCapacity)
        .collect(Collectors.toList());
      Collections.shuffle(courseSubList, random);

      int lectureCount = 0;
      for (Course course : courseSubList) {
        lectureCount += course.getLectureSize();
        if (lectureCount > PERIOD_LIST_SIZE) {
          break;
        }
        course.getCurriculumList().add(curriculum);
        course.setStudentSize(course.getStudentSize() + studentSize);
      }

      curriculumList.add(curriculum);
    }
    schedule.setCurriculumList(curriculumList);
  }

  private void createUnavailablePeriodPenaltyList(CourseSchedule schedule) {
    List<Course> courseList = schedule.getCourses();
    List<Period> periodList = schedule.getPeriods();
    List<UnavailablePeriodPenalty> unavailablePeriodPenaltyList = new ArrayList<>(courseList.size());
    long penaltyId = 0L;
    for (Course course : courseList) {
      UnavailablePeriodPenalty penalty = new UnavailablePeriodPenalty(course, periodList.get(random.nextInt(periodList.size())));
      penalty.setId(penaltyId);
      penaltyId++;
      unavailablePeriodPenaltyList.add(penalty);
    }
    schedule.setUnavailablePeriodPenaltyList(unavailablePeriodPenaltyList);
  }

}
