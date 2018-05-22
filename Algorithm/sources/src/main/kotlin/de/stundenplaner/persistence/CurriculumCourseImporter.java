///*
// * Copyright 2010 Red Hat, Inc. and/or its affiliates.
// *
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *      http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// */
//
//package de.stundenplaner.persistence;
//
//import de.stundenplaner.domain.*;
//import org.optaplanner.examples.common.persistence.AbstractTxtSolutionImporter;
//import org.optaplanner.examples.common.persistence.SolutionConverter;
//import org.optaplanner.examples.curriculumcourse.domain.Curriculum;
//import org.optaplanner.examples.curriculumcourse.domain.UnavailablePeriodPenalty;
//
//import java.io.IOException;
//import java.math.BigInteger;
//import java.util.*;
//
//import static de.stundenplaner.app.CurriculumCourseAppKt.DATA_DIR_NAME;
//
//public class CurriculumCourseImporter extends AbstractTxtSolutionImporter<CourseSchedule> {
//
//  private static final String INPUT_FILE_SUFFIX = "ctt";
//
//  public static void main(String[] args) {
//    SolutionConverter<CourseSchedule> converter = SolutionConverter.createImportConverter(
//      DATA_DIR_NAME, new CurriculumCourseImporter(), CourseSchedule.class);
//    converter.convertAll();
//  }
//
//  @Override
//  public String getInputFileSuffix() {
//    return INPUT_FILE_SUFFIX;
//  }
//
//  @Override
//  public TxtInputBuilder<CourseSchedule> createTxtInputBuilder() {
//    return new CurriculumCourseInputBuilder();
//  }
//
//  public static class CurriculumCourseInputBuilder extends TxtInputBuilder<CourseSchedule> {
//
//    @Override
//    public CourseSchedule readSolution() throws IOException {
//      CourseSchedule schedule = new CourseSchedule();
//      schedule.setId(0L);
//      // Name: ToyExample
//      schedule.setName(readStringValue("Name:"));
//      // Courses: 4
//      int courseListSize = readIntegerValue("Courses:");
//      // Rooms: 2
//      int roomListSize = readIntegerValue("Rooms:");
//      // Days: 5
//      int dayListSize = readIntegerValue("Days:");
//      // Periods_per_day: 4
//      int timeslotListSize = readIntegerValue("Periods_per_day:");
//      // Curricula: 2
//      int curriculumListSize = readIntegerValue("Curricula:");
//      // Constraints: 8
//      int unavailablePeriodPenaltyListSize = readIntegerValue("Constraints:");
//
//      Map<String, Course> courseMap = readCourseListAndTeacherList(
//        schedule, courseListSize);
//      readRoomList(
//        schedule, roomListSize);
//      Map<List<Integer>, Period> periodMap = createPeriodListAndDayListAndTimeslotList(
//        schedule, dayListSize, timeslotListSize);
//      readCurriculumList(
//        schedule, courseMap, curriculumListSize);
//      readUnavailablePeriodPenaltyList(
//        schedule, courseMap, periodMap, unavailablePeriodPenaltyListSize);
//      readEmptyLine();
//      readConstantLine("END\\.");
//      createLectureList(schedule);
//
//      int possibleForOneLectureSize = schedule.getPeriods().size() * schedule.getRooms().size();
//      BigInteger possibleSolutionSize = BigInteger.valueOf(possibleForOneLectureSize).pow(
//        schedule.getLectures().size());
//      logger.info("CourseSchedule {} has {} teachers, {} curricula, {} courses, {} lectures," +
//          " {} periods, {} rooms and {} unavailable period constraints with a search space of {}.",
//        getInputId(),
//        schedule.getTeachers().size(),
//        schedule.getCurriculumList().size(),
//        schedule.getCourses().size(),
//        schedule.getLectures().size(),
//        schedule.getPeriods().size(),
//        schedule.getRooms().size(),
//        schedule.getUnavailablePeriodPenaltyList().size(),
//        getFlooredPossibleSolutionSize(possibleSolutionSize));
//      return schedule;
//    }
//
//    private Map<String, Course> readCourseListAndTeacherList(
//      CourseSchedule schedule, int courseListSize) throws IOException {
//      Map<String, Course> courseMap = new HashMap<>(courseListSize);
//      Map<String, Teacher> teacherMap = new HashMap<>();
//      List<Course> courseList = new ArrayList<>(courseListSize);
//      readEmptyLine();
//      readConstantLine("COURSES:");
//      for (int i = 0; i < courseListSize; i++) {
//        // Courses: <CourseID> <Teacher> <# Lectures> <MinWorkingDays> <# Students>
//        String line = bufferedReader.readLine();
//        String[] lineTokens = splitBySpacesOrTabs(line, 5);
//        String code = lineTokens[0];
//        Teacher teacher = findOrCreateTeacher(teacherMap, lineTokens[1]);
//        int lectureSize = Integer.parseInt(lineTokens[2]);
//        ArrayList<Curriculum> curriculumList = new ArrayList<>();
//        int studentSize = Integer.parseInt(lineTokens[4]);
//        int minWorkingDaySize = Integer.parseInt(lineTokens[3]);
//        Course course = new Course(code, teacher, curriculumList, lectureSize, minWorkingDaySize, studentSize);
//        course.setId((long) i);
//        courseList.add(course);
//        courseMap.put(course.getCode(), course);
//      }
//      schedule.setCourses(courseList);
//      List<Teacher> teacherList = new ArrayList<>(teacherMap.values());
//      schedule.setTeachers(teacherList);
//      return courseMap;
//    }
//
//    private Teacher findOrCreateTeacher(Map<String, Teacher> teacherMap, String code) {
//      Teacher teacher = teacherMap.get(code);
//      if (teacher == null) {
//        teacher = new Teacher(code);
//        int id = teacherMap.size();
//        teacher.setId((long) id);
//        teacherMap.put(code, teacher);
//      }
//      return teacher;
//    }
//
//    private void readRoomList(CourseSchedule schedule, int roomListSize)
//      throws IOException {
//      readEmptyLine();
//      readConstantLine("ROOMS:");
//      List<Room> roomList = new ArrayList<>(roomListSize);
//      for (int i = 0; i < roomListSize; i++) {
//        // Rooms: <RoomID> <Capacity>
//        String line = bufferedReader.readLine();
//        String[] lineTokens = splitBySpacesOrTabs(line, 2);
//        String code = lineTokens[0];
//        int capacity = Integer.parseInt(lineTokens[1]);
//        Room room = new Room(code, capacity);
//        room.setId((long) i);
//        roomList.add(room);
//      }
//      schedule.setRooms(roomList);
//    }
//
//    private Map<List<Integer>, Period> createPeriodListAndDayListAndTimeslotList(
//      CourseSchedule schedule, int dayListSize, int timeslotListSize) throws IOException {
//      int periodListSize = dayListSize * timeslotListSize;
//      Map<List<Integer>, Period> periodMap = new HashMap<>(periodListSize);
//      List<Day> dayList = new ArrayList<>(dayListSize);
//      for (int i = 0; i < dayListSize; i++) {
//        ArrayList<Period> periodList = new ArrayList<>(timeslotListSize);
//        Day day = new Day(i, periodList);
//        day.setId((long) i);
//        dayList.add(day);
//      }
//      schedule.setDayList(dayList);
//      List<TimeSlot> timeSlotList = new ArrayList<>(timeslotListSize);
//      for (int i = 0; i < timeslotListSize; i++) {
//        TimeSlot timeSlot = new TimeSlot(i);
//        timeSlot.setId((long) i);
//        timeSlotList.add(timeSlot);
//      }
//      schedule.setTimeSlotList(timeSlotList);
//      List<Period> periodList = new ArrayList<>(periodListSize);
//      for (int i = 0; i < dayListSize; i++) {
//        Day day = dayList.get(i);
//        for (int j = 0; j < timeslotListSize; j++) {
//          TimeSlot timeSlot = timeSlotList.get(j);
//          Period period = new Period(day, timeSlot);
//          period.setId((long) (i * timeslotListSize + j));
//          periodList.add(period);
//          periodMap.put(Arrays.asList(i, j), period);
//          day.getPeriodList().add(period);
//        }
//      }
//      schedule.setPeriods(periodList);
//      return periodMap;
//    }
//
//    private void readCurriculumList(CourseSchedule schedule,
//                                    Map<String, Course> courseMap, int curriculumListSize) throws IOException {
//      readEmptyLine();
//      readConstantLine("CURRICULA:");
//      List<Curriculum> curriculumList = new ArrayList<>(curriculumListSize);
//      for (int i = 0; i < curriculumListSize; i++) {
//        // Curricula: <CurriculumID> <# Courses> <MemberID> ... <MemberID>
//        String line = bufferedReader.readLine();
//        String[] lineTokens = splitBySpacesOrTabs(line);
//        if (lineTokens.length < 2) {
//          throw new IllegalArgumentException("Read line (" + line
//            + ") is expected to contain at least 2 tokens.");
//        }
//        String code = lineTokens[0];
//        Curriculum curriculum = new Curriculum(code);
//        curriculum.setId((long) i);
//        int coursesInCurriculum = Integer.parseInt(lineTokens[1]);
//        if (lineTokens.length != (coursesInCurriculum + 2)) {
//          throw new IllegalArgumentException("Read line (" + line + ") is expected to contain "
//            + (coursesInCurriculum + 2) + " tokens.");
//        }
//        for (int j = 2; j < lineTokens.length; j++) {
//          Course course = courseMap.get(lineTokens[j]);
//          if (course == null) {
//            throw new IllegalArgumentException("Read line (" + line + ") uses an unexisting course("
//              + lineTokens[j] + ").");
//          }
//          course.getCurriculumList().add(curriculum);
//        }
//        curriculumList.add(curriculum);
//      }
//      schedule.setCurriculumList(curriculumList);
//    }
//
//    private void readUnavailablePeriodPenaltyList(CourseSchedule schedule, Map<String, Course> courseMap,
//                                                  Map<List<Integer>, Period> periodMap, int unavailablePeriodPenaltyListSize)
//      throws IOException {
//      readEmptyLine();
//      readConstantLine("UNAVAILABILITY_CONSTRAINTS:");
//      List<UnavailablePeriodPenalty> penaltyList = new ArrayList<>(
//        unavailablePeriodPenaltyListSize);
//      for (int i = 0; i < unavailablePeriodPenaltyListSize; i++) {
//        // Unavailability_Constraints: <CourseID> <Day> <Day_Period>
//        String line = bufferedReader.readLine();
//        String[] lineTokens = splitBySpacesOrTabs(line, 3);
//        Course course = courseMap.get(lineTokens[0]);
//        int dayIndex = Integer.parseInt(lineTokens[1]);
//        int timeslotIndex = Integer.parseInt(lineTokens[2]);
//        Period period = periodMap.get(Arrays.asList(dayIndex, timeslotIndex));
//        UnavailablePeriodPenalty penalty = new UnavailablePeriodPenalty(course, period);
//        penalty.setId((long) i);
//        if (period == null) {
//          throw new IllegalArgumentException("Read line (" + line + ") uses an unexisting period("
//            + dayIndex + " " + timeslotIndex + ").");
//        }
//        penalty.setPeriod(period);
//        penaltyList.add(penalty);
//      }
//      schedule.setUnavailablePeriodPenaltyList(penaltyList);
//    }
//
//    private void createLectureList(CourseSchedule schedule) {
//      List<Course> courseList = schedule.getCourses();
//      List<Lecture> lectureList = new ArrayList<>(courseList.size());
//      long id = 0L;
//      for (Course course : courseList) {
//        for (int i = 0; i < course.getLectureSize(); i++) {
//          Lecture lecture = new Lecture();
//          lecture.setId(id);
//          lecture.setCourse(course);
//          lecture.setLectureIndexInCourse(i);
//          id++;
//          // Notice that we leave the PlanningVariable properties on null
//          lectureList.add(lecture);
//        }
//      }
//      schedule.setLectures(lectureList);
//    }
//
//  }
//
//}
