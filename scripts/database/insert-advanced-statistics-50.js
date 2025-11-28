require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const questions = [
  {pos:1,diff:'hard',text:'A dataset has mean 100 and standard deviation 15. A value of 130 has what z-score?',ch:[{letter:'A',text:'1.5'},{letter:'B',text:'2.0'},{letter:'C',text:'2.5'},{letter:'D',text:'1.0'}],ans:'B',sol:'**Calculate the z-score using the formula z = (x - μ) / σ.**\n\n```\nz = (x - μ) / σ\n  = (130 - 100) / 15\n  = 30 / 15\n  = 2.0\n```\n**Key insight:** A z-score of 2.0 means the value is 2 standard deviations above the mean.'},

  {pos:2,diff:'hard',text:'The variance of {2, 4, 6, 8, 10} is calculated. What is the population variance?',ch:[{letter:'A',text:'8'},{letter:'B',text:'10'},{letter:'C',text:'6'},{letter:'D',text:'4'}],ans:'A',sol:'**Calculate mean, then variance using σ² = Σ(x-μ)²/N.**\n\n```\nMean μ = (2+4+6+8+10)/5 = 30/5 = 6\n\nDeviations squared:\n(2-6)² = 16\n(4-6)² = 4\n(6-6)² = 0\n(8-6)² = 4\n(10-6)² = 16\n\nPopulation variance = (16+4+0+4+16)/5 = 40/5 = 8\n```\n**Key insight:** Population variance divides by N (not N-1). The variance is 8.'},

  {pos:3,diff:'hard',text:'In a normal distribution, approximately what percentage of data falls within 2 standard deviations of the mean?',ch:[{letter:'A',text:'68%'},{letter:'B',text:'95%'},{letter:'C',text:'99.7%'},{letter:'D',text:'99%'}],ans:'B',sol:'**Recall the empirical rule (68-95-99.7 rule).**\n\n```\nWithin 1σ: ~68%\nWithin 2σ: ~95%\nWithin 3σ: ~99.7%\n```\n**Key insight:** The empirical rule states that approximately 95% of data in a normal distribution falls within 2 standard deviations of the mean.'},

  {pos:4,diff:'hard',text:'A dataset has Q1 = 20, Q3 = 40, and IQR = 20. Using the 1.5×IQR rule, what is the upper fence for outliers?',ch:[{letter:'A',text:'60'},{letter:'B',text:'70'},{letter:'C',text:'50'},{letter:'D',text:'65'}],ans:'B',sol:'**Calculate the upper fence using Q3 + 1.5×IQR.**\n\n```\nUpper fence = Q3 + 1.5×IQR\n            = 40 + 1.5×20\n            = 40 + 30\n            = 70\n```\n**Key insight:** Any value above 70 is considered an outlier by the 1.5×IQR rule.'},

  {pos:5,diff:'hard',text:'Two datasets have the same mean but different standard deviations: σ₁ = 5 and σ₂ = 10. Which statement is true?',ch:[{letter:'A',text:'Dataset 1 has more spread'},{letter:'B',text:'Dataset 2 has more spread'},{letter:'C',text:'They have equal spread'},{letter:'D',text:'Cannot determine'}],ans:'B',sol:'**Compare standard deviations to assess spread.**\n\n```\nσ₁ = 5 (smaller)\nσ₂ = 10 (larger)\n\nLarger standard deviation → more spread\n```\n**Key insight:** Standard deviation measures spread. Dataset 2 with σ = 10 has more variability than dataset 1 with σ = 5.'},

  {pos:6,diff:'hard',text:'A value has a z-score of -1.5 in a distribution with mean 50 and standard deviation 8. What is the value?',ch:[{letter:'A',text:'38'},{letter:'B',text:'42'},{letter:'C',text:'35'},{letter:'D',text:'62'}],ans:'A',sol:'**Use the z-score formula and solve for x.**\n\n```\nz = (x - μ) / σ\n-1.5 = (x - 50) / 8\n-12 = x - 50\nx = 38\n```\n**Key insight:** A z-score of -1.5 means the value is 1.5 standard deviations below the mean. Here, x = 50 - 12 = 38.'},

  {pos:7,diff:'hard',text:'The sample standard deviation of 5 values uses what divisor in the variance calculation?',ch:[{letter:'A',text:'5'},{letter:'B',text:'4'},{letter:'C',text:'6'},{letter:'D',text:'3'}],ans:'B',sol:'**Understand sample vs population variance.**\n\n```\nSample variance: s² = Σ(x-x̄)² / (n-1)\nWith n=5: divisor = 5-1 = 4\n\nPopulation variance: σ² = Σ(x-μ)² / N\nWith N=5: divisor = 5\n```\n**Key insight:** Sample variance uses n-1 (Bessel\'s correction) to provide an unbiased estimator. For 5 values, divisor = 4.'},

  {pos:8,diff:'hard',text:'A dataset has 5-number summary: min=10, Q1=20, median=30, Q3=40, max=50. What is the range?',ch:[{letter:'A',text:'30'},{letter:'B',text:'40'},{letter:'C',text:'50'},{letter:'D',text:'20'}],ans:'B',sol:'**Calculate range from minimum and maximum.**\n\n```\nRange = max - min\n      = 50 - 10\n      = 40\n```\n**Key insight:** Range is the difference between the maximum and minimum values. Range = 40.'},

  {pos:9,diff:'hard',text:'In a normal distribution with μ=100 and σ=10, what is the 84th percentile approximately?',ch:[{letter:'A',text:'110'},{letter:'B',text:'120'},{letter:'C',text:'105'},{letter:'D',text:'115'}],ans:'A',sol:'**Use the empirical rule and z-scores.**\n\n```\nThe 84th percentile corresponds to z ≈ 1\n(since 50% below mean + 34% from mean to +1σ = 84%)\n\nValue = μ + z×σ\n      = 100 + 1×10\n      = 110\n```\n**Key insight:** In a normal distribution, approximately 84% of data falls below +1 standard deviation. The 84th percentile is 110.'},

  {pos:10,diff:'hard',text:'Two datasets have the same 5-number summary except for different maximums. Which measure is definitely different?',ch:[{letter:'A',text:'Mean'},{letter:'B',text:'Range'},{letter:'C',text:'Median'},{letter:'D',text:'IQR'}],ans:'B',sol:'**Analyze which measures depend on the maximum.**\n\n```\nMedian: depends only on middle value(s) → same\nIQR: Q3 - Q1 → same (both given as same)\nRange: max - min → different (different max)\nMean: depends on all values → might be different\n```\n**Key insight:** Range directly depends on the maximum, so it must be different. Median and IQR don\'t depend on the maximum.'},

  {pos:11,diff:'hard',text:'A dataset has mean 60 and every value is transformed to z-scores. What is the standard deviation of the z-scores?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'60'},{letter:'D',text:'Cannot determine'}],ans:'B',sol:'**Understand z-score standardization.**\n\n```\nZ-scores: z = (x - μ) / σ\n\nStandardization transforms any distribution to:\n- Mean = 0\n- Standard deviation = 1\n```\n**Key insight:** By definition, z-scores have standard deviation 1, regardless of the original distribution.'},

  {pos:12,diff:'hard',text:'A box plot shows Q1=15, median=25, Q3=35. The whiskers extend to 5 and 50. Using the 1.5×IQR rule, is 50 an outlier?',ch:[{letter:'A',text:'Yes, mild outlier'},{letter:'B',text:'Yes, extreme outlier'},{letter:'C',text:'No'},{letter:'D',text:'Cannot determine'}],ans:'C',sol:'**Check if 50 exceeds the upper fence.**\n\n```\nIQR = Q3 - Q1 = 35 - 15 = 20\n\nUpper fence = Q3 + 1.5×IQR\n            = 35 + 1.5×20\n            = 35 + 30\n            = 65\n\n50 < 65, so not an outlier\n```\n**Key insight:** Values are outliers only if they exceed Q3 + 1.5×IQR (or fall below Q1 - 1.5×IQR). Since 50 < 65, it\'s not an outlier.'},

  {pos:13,diff:'hard',text:'The correlation coefficient between two variables is r = -0.8. What does this indicate?',ch:[{letter:'A',text:'Strong positive relationship'},{letter:'B',text:'Strong negative relationship'},{letter:'C',text:'Weak negative relationship'},{letter:'D',text:'No relationship'}],ans:'B',sol:'**Interpret the correlation coefficient.**\n\n```\nCorrelation r ranges from -1 to +1:\n\nr ≈ +1: strong positive\nr ≈ 0: no linear relationship\nr ≈ -1: strong negative\n\nr = -0.8 is close to -1\n```\n**Key insight:** r = -0.8 indicates a strong negative linear relationship: as one variable increases, the other tends to decrease.'},

  {pos:14,diff:'hard',text:'A dataset has standard deviation 12. If all values are multiplied by 3, what is the new standard deviation?',ch:[{letter:'A',text:'12'},{letter:'B',text:'36'},{letter:'C',text:'15'},{letter:'D',text:'4'}],ans:'B',sol:'**Understand how transformations affect standard deviation.**\n\n```\nOriginal σ = 12\n\nMultiplying all values by k:\nNew σ = k × (original σ)\n      = 3 × 12\n      = 36\n```\n**Key insight:** Multiplying all values by a constant k multiplies the standard deviation by |k|. Here, new σ = 36.'},

  {pos:15,diff:'hard',text:'The 90th percentile of a dataset is 75. Approximately what percentage of data is below 75?',ch:[{letter:'A',text:'75%'},{letter:'B',text:'90%'},{letter:'C',text:'10%'},{letter:'D',text:'85%'}],ans:'B',sol:'**Understand percentile definition.**\n\n```\nThe 90th percentile means:\n90% of the data is below this value\n10% of the data is above this value\n```\n**Key insight:** By definition, 90% of data falls below the 90th percentile.'},

  {pos:16,diff:'hard',text:'A scatter plot shows points forming a pattern from lower-left to upper-right. What is the likely correlation?',ch:[{letter:'A',text:'Negative'},{letter:'B',text:'Positive'},{letter:'C',text:'Zero'},{letter:'D',text:'Cannot determine'}],ans:'B',sol:'**Interpret scatter plot patterns.**\n\n```\nLower-left to upper-right:\n  As x increases, y increases\n  → Positive correlation\n\nUpper-left to lower-right:\n  As x increases, y decreases\n  → Negative correlation\n\nNo clear pattern:\n  → Zero/weak correlation\n```\n**Key insight:** An upward trend (lower-left to upper-right) indicates positive correlation.'},

  {pos:17,diff:'hard',text:'A dataset has Q1=30, median=50, Q3=60. The distribution is most likely:',ch:[{letter:'A',text:'Symmetric'},{letter:'B',text:'Right-skewed'},{letter:'C',text:'Left-skewed'},{letter:'D',text:'Cannot determine'}],ans:'C',sol:'**Analyze the spacing of quartiles.**\n\n```\nQ1 to median: 50-30 = 20\nMedian to Q3: 60-50 = 10\n\nLeft side is more spread than right side\n→ Left-skewed (negatively skewed)\n```\n**Key insight:** When Q1 to median > median to Q3, the distribution is left-skewed, with a longer tail on the left.'},

  {pos:18,diff:'hard',text:'The coefficient of determination r² = 0.64. What percentage of variability is explained by the regression line?',ch:[{letter:'A',text:'64%'},{letter:'B',text:'0.64%'},{letter:'C',text:'80%'},{letter:'D',text:'36%'}],ans:'A',sol:'**Interpret r² (coefficient of determination).**\n\n```\nr² = 0.64 = 64%\n\nThis means 64% of the variability in y\nis explained by the linear relationship with x.\n\n36% is unexplained (residual variability)\n```\n**Key insight:** r² directly gives the percentage of variability explained. r² = 0.64 means 64% explained.'},

  {pos:19,diff:'hard',text:'A dataset has variance 25. What is the standard deviation?',ch:[{letter:'A',text:'5'},{letter:'B',text:'25'},{letter:'C',text:'12.5'},{letter:'D',text:'625'}],ans:'A',sol:'**Calculate standard deviation from variance.**\n\n```\nσ = √(variance)\n  = √25\n  = 5\n```\n**Key insight:** Standard deviation is the square root of variance. σ = √25 = 5.'},

  {pos:20,diff:'hard',text:'In a normal distribution, what z-score corresponds to the median?',ch:[{letter:'A',text:'1'},{letter:'B',text:'0.5'},{letter:'C',text:'0'},{letter:'D',text:'-0.5'}],ans:'C',sol:'**Understand the relationship between median and mean in normal distributions.**\n\n```\nIn a normal distribution:\n- Mean = Median = Mode\n- Median is at the center\n\nZ-score of median:\nz = (median - mean) / σ\n  = (mean - mean) / σ\n  = 0 / σ\n  = 0\n```\n**Key insight:** In a symmetric normal distribution, the median equals the mean, so its z-score is 0.'},

  {pos:21,diff:'hard',text:'A dataset has mean 80 and standard deviation 10. After adding 5 to each value, what is the new variance?',ch:[{letter:'A',text:'100'},{letter:'B',text:'125'},{letter:'C',text:'115'},{letter:'D',text:'110'}],ans:'A',sol:'**Understand how translations affect variance.**\n\n```\nOriginal variance = σ² = 10² = 100\n\nAdding a constant to all values:\n- Changes the mean\n- Does NOT change variance or standard deviation\n\nNew variance = 100\n```\n**Key insight:** Adding a constant shifts the distribution but doesn\'t change the spread. Variance remains 100.'},

  {pos:22,diff:'hard',text:'The lower fence for outliers is calculated as Q1 - 1.5×IQR. If Q1=50 and Q3=80, what is the lower fence?',ch:[{letter:'A',text:'5'},{letter:'B',text:'20'},{letter:'C',text:'0'},{letter:'D',text:'10'}],ans:'A',sol:'**Calculate the lower fence.**\n\n```\nIQR = Q3 - Q1 = 80 - 50 = 30\n\nLower fence = Q1 - 1.5×IQR\n            = 50 - 1.5×30\n            = 50 - 45\n            = 5\n```\n**Key insight:** Values below 5 would be considered outliers. The lower fence is 5.'},

  {pos:23,diff:'hard',text:'A regression line has equation ŷ = 5 + 2x. If x increases by 3 units, how much does ŷ increase?',ch:[{letter:'A',text:'5'},{letter:'B',text:'6'},{letter:'C',text:'2'},{letter:'D',text:'3'}],ans:'B',sol:'**Use the slope of the regression line.**\n\n```\nŷ = 5 + 2x\nSlope = 2 (change in ŷ per unit change in x)\n\nIf x increases by 3:\nΔŷ = slope × Δx\n   = 2 × 3\n   = 6\n```\n**Key insight:** The slope 2 means ŷ increases by 2 for each unit increase in x. For a 3-unit increase in x, ŷ increases by 6.'},

  {pos:24,diff:'hard',text:'A dataset has values {10, 20, 30, 40, 100}. The mean is 40. Which measure better represents the typical value?',ch:[{letter:'A',text:'Mean'},{letter:'B',text:'Median'},{letter:'C',text:'Mode'},{letter:'D',text:'Range'}],ans:'B',sol:'**Compare mean and median in the presence of outliers.**\n\n```\nMean = 40\nMedian = 30 (middle value)\n\nThe value 100 is an outlier pulling the mean up.\n\nMedian (30) is more representative of typical values\n(10, 20, 30, 40 are close, 100 is far)\n```\n**Key insight:** When outliers are present, the median is often a better measure of center than the mean, as it\'s resistant to extreme values.'},

  {pos:25,diff:'hard',text:'The standard error of the mean (SEM) for a sample of size 25 with standard deviation 15 is:',ch:[{letter:'A',text:'15'},{letter:'B',text:'3'},{letter:'C',text:'5'},{letter:'D',text:'7.5'}],ans:'B',sol:'**Calculate standard error using SEM = σ/√n.**\n\n```\nSEM = σ / √n\n    = 15 / √25\n    = 15 / 5\n    = 3\n```\n**Key insight:** Standard error measures the variability of sample means. It decreases as sample size increases. SEM = 3.'},

  {pos:26,diff:'hard',text:'A dataset has mean 50, median 45, and mode 40. The distribution is likely:',ch:[{letter:'A',text:'Symmetric'},{letter:'B',text:'Right-skewed'},{letter:'C',text:'Left-skewed'},{letter:'D',text:'Uniform'}],ans:'B',sol:'**Compare mean, median, and mode to determine skewness.**\n\n```\nMode < Median < Mean\n40 < 45 < 50\n\nThis pattern indicates right-skew:\n- Mode at the peak\n- Median in middle\n- Mean pulled right by high outliers\n```\n**Key insight:** When mean > median > mode, the distribution is right-skewed (positively skewed) with a long tail on the right.'},

  {pos:27,diff:'hard',text:'In a normal distribution, approximately what percentage of data has z-scores between -1 and +1?',ch:[{letter:'A',text:'50%'},{letter:'B',text:'68%'},{letter:'C',text:'95%'},{letter:'D',text:'99.7%'}],ans:'B',sol:'**Apply the empirical rule.**\n\n```\nWithin 1 standard deviation (z between -1 and +1):\nApproximately 68% of data\n\nWithin 2σ: ~95%\nWithin 3σ: ~99.7%\n```\n**Key insight:** The empirical rule states about 68% of data in a normal distribution falls within 1 standard deviation of the mean.'},

  {pos:28,diff:'hard',text:'A sample has variance s² = 36. If the sample size is 10, what is the sample standard deviation?',ch:[{letter:'A',text:'6'},{letter:'B',text:'3.6'},{letter:'C',text:'18'},{letter:'D',text:'36'}],ans:'A',sol:'**Calculate standard deviation from variance.**\n\n```\ns = √(s²)\n  = √36\n  = 6\n\nSample size doesn\'t affect this calculation.\n```\n**Key insight:** Sample standard deviation is the square root of sample variance, regardless of sample size. s = 6.'},

  {pos:29,diff:'hard',text:'The residual in regression is the difference between:',ch:[{letter:'A',text:'x and ŷ'},{letter:'B',text:'y and ŷ'},{letter:'C',text:'x and y'},{letter:'D',text:'slope and intercept'}],ans:'B',sol:'**Understand residuals in regression.**\n\n```\nResidual = y - ŷ\n         = (actual value) - (predicted value)\n\nMeasures the prediction error\n```\n**Key insight:** Residuals measure how far the actual y values are from the predicted ŷ values on the regression line.'},

  {pos:30,diff:'hard',text:'A dataset has Q1=20, Q2=30, Q3=50. What is the semi-interquartile range (SIQR)?',ch:[{letter:'A',text:'15'},{letter:'B',text:'30'},{letter:'C',text:'10'},{letter:'D',text:'25'}],ans:'A',sol:'**Calculate SIQR as half the IQR.**\n\n```\nIQR = Q3 - Q1 = 50 - 20 = 30\n\nSIQR = IQR / 2 = 30 / 2 = 15\n```\n**Key insight:** The semi-interquartile range is half the IQR, measuring the spread of the middle 50% of data. SIQR = 15.'},

  {pos:31,diff:'hard',text:'A dataset has outliers at both extremes. Which measure of spread is most resistant to outliers?',ch:[{letter:'A',text:'Range'},{letter:'B',text:'Standard deviation'},{letter:'C',text:'IQR'},{letter:'D',text:'Variance'}],ans:'C',sol:'**Compare resistance to outliers.**\n\n```\nRange: max - min → very sensitive to outliers\nStd deviation: uses all values → sensitive to outliers\nVariance: (std dev)² → very sensitive to outliers\nIQR: Q3 - Q1 → based on middle 50%, resistant to outliers\n```\n**Key insight:** IQR only depends on the quartiles, not the extreme values, making it resistant to outliers.'},

  {pos:32,diff:'hard',text:'In a positive correlation, as x increases, y:',ch:[{letter:'A',text:'Decreases'},{letter:'B',text:'Increases'},{letter:'C',text:'Stays the same'},{letter:'D',text:'Varies randomly'}],ans:'B',sol:'**Define positive correlation.**\n\n```\nPositive correlation (r > 0):\n- As x increases, y tends to increase\n- Upward trend\n\nNegative correlation (r < 0):\n- As x increases, y tends to decrease\n- Downward trend\n```\n**Key insight:** Positive correlation means both variables move in the same direction.'},

  {pos:33,diff:'hard',text:'A z-score of 0 indicates that the value is:',ch:[{letter:'A',text:'Below the mean'},{letter:'B',text:'Equal to the mean'},{letter:'C',text:'Above the mean'},{letter:'D',text:'An outlier'}],ans:'B',sol:'**Interpret z = 0.**\n\n```\nz = (x - μ) / σ\n\nIf z = 0:\n(x - μ) / σ = 0\nx - μ = 0\nx = μ\n```\n**Key insight:** A z-score of 0 means the value equals the mean exactly.'},

  {pos:34,diff:'hard',text:'The percentile rank of a value tells you what percentage of data is:',ch:[{letter:'A',text:'Above the value'},{letter:'B',text:'Equal to the value'},{letter:'C',text:'Below or equal to the value'},{letter:'D',text:'Within one standard deviation'}],ans:'C',sol:'**Define percentile rank.**\n\n```\nPercentile rank = percentage of data ≤ the value\n\nExample: 75th percentile means\n75% of data is below or equal to this value\n```\n**Key insight:** Percentile rank indicates the percentage of data at or below a given value.'},

  {pos:35,diff:'hard',text:'A regression line ŷ = 10 + 0.5x has r² = 0.49. What is the correlation coefficient r?',ch:[{letter:'A',text:'0.7 or -0.7'},{letter:'B',text:'0.49'},{letter:'C',text:'0.7'},{letter:'D',text:'-0.7'}],ans:'A',sol:'**Calculate r from r².**\n\n```\nr² = 0.49\nr = ±√0.49 = ±0.7\n\nSince the slope (0.5) is positive:\nr = +0.7\n\nBut without knowing the sign, r could be ±0.7\n```\n**Key insight:** r² gives the absolute relationship strength. The sign of r matches the slope sign. Here, positive slope → r = +0.7, but mathematically r = ±0.7.'},

  {pos:36,diff:'hard',text:'A dataset has mean 100 and σ = 20. What percentage of values fall between 80 and 120?',ch:[{letter:'A',text:'50%'},{letter:'B',text:'68%'},{letter:'C',text:'95%'},{letter:'D',text:'75%'}],ans:'B',sol:'**Apply the empirical rule.**\n\n```\nMean = 100, σ = 20\n\n80 = 100 - 20 = μ - σ (one std dev below)\n120 = 100 + 20 = μ + σ (one std dev above)\n\nRange from μ-σ to μ+σ contains ~68% of data\n```\n**Key insight:** In a normal distribution, approximately 68% of data falls within 1 standard deviation of the mean.'},

  {pos:37,diff:'hard',text:'The mean of a sample is an unbiased estimator of the population mean. What does "unbiased" mean?',ch:[{letter:'A',text:'Always equals the population mean'},{letter:'B',text:'Expected value equals the population mean'},{letter:'C',text:'Has minimum variance'},{letter:'D',text:'Is the median of sampling distribution'}],ans:'B',sol:'**Define unbiased estimator.**\n\n```\nAn estimator is unbiased if:\nE[estimator] = parameter\n\nFor sample mean x̄:\nE[x̄] = μ (population mean)\n\nThis doesn\'t mean x̄ always equals μ,\nbut on average across many samples, it does.\n```\n**Key insight:** An unbiased estimator\'s expected value (average over many samples) equals the population parameter.'},

  {pos:38,diff:'hard',text:'A scatter plot shows no clear pattern. The correlation is likely:',ch:[{letter:'A',text:'Strongly positive'},{letter:'B',text:'Strongly negative'},{letter:'C',text:'Close to zero'},{letter:'D',text:'Cannot determine'}],ans:'C',sol:'**Interpret scatter plot with no pattern.**\n\n```\nNo clear pattern:\n- Points scattered randomly\n- No upward or downward trend\n- Correlation near 0\n```\n**Key insight:** When there\'s no visible linear pattern in a scatter plot, the correlation coefficient is close to zero, indicating little to no linear relationship.'},

  {pos:39,diff:'hard',text:'Which statement about outliers is FALSE?',ch:[{letter:'A',text:'They greatly affect the mean'},{letter:'B',text:'They greatly affect the median'},{letter:'C',text:'They greatly affect the range'},{letter:'D',text:'They greatly affect the standard deviation'}],ans:'B',sol:'**Identify which measure is resistant to outliers.**\n\n```\nOutliers affect:\n- Mean: YES (very sensitive)\n- Median: NO (resistant)\n- Range: YES (uses extremes)\n- Standard deviation: YES (squared deviations)\n```\n**Key insight:** The median is resistant to outliers because it only depends on the middle value(s), not extreme values. Statement B is FALSE.'},

  {pos:40,diff:'hard',text:'A dataset has σ = 8. If we add 10 to each value, what is the new standard deviation?',ch:[{letter:'A',text:'8'},{letter:'B',text:'18'},{letter:'C',text:'10'},{letter:'D',text:'12'}],ans:'A',sol:'**Understand how translations affect standard deviation.**\n\n```\nAdding a constant to all values:\n- Shifts the distribution\n- Doesn\'t change the spread\n- Standard deviation unchanged\n\nNew σ = 8\n```\n**Key insight:** Adding a constant translates all values equally, maintaining the same spread. Standard deviation remains 8.'},

  {pos:41,diff:'hard',text:'The 25th percentile is also called:',ch:[{letter:'A',text:'Q2'},{letter:'B',text:'Q1'},{letter:'C',text:'Q3'},{letter:'D',text:'Median'}],ans:'B',sol:'**Identify quartile names.**\n\n```\nQ1 = 25th percentile (first quartile)\nQ2 = 50th percentile (median, second quartile)\nQ3 = 75th percentile (third quartile)\n```\n**Key insight:** Q1 is the 25th percentile, marking the value below which 25% of the data falls.'},

  {pos:42,diff:'hard',text:'A regression line has slope 3 and y-intercept 5. What is the predicted value when x = 10?',ch:[{letter:'A',text:'35'},{letter:'B',text:'30'},{letter:'C',text:'25'},{letter:'D',text:'15'}],ans:'A',sol:'**Use the regression equation ŷ = b₀ + b₁x.**\n\n```\nŷ = 5 + 3x\n\nWhen x = 10:\nŷ = 5 + 3(10)\n  = 5 + 30\n  = 35\n```\n**Key insight:** Substitute x into the regression equation to find the predicted y value. ŷ = 35.'},

  {pos:43,diff:'hard',text:'A box plot shows the box from 20 to 40 with a line at 30. This line represents:',ch:[{letter:'A',text:'Mean'},{letter:'B',text:'Median'},{letter:'C',text:'Mode'},{letter:'D',text:'Q1'}],ans:'B',sol:'**Understand box plot components.**\n\n```\nBox plot structure:\n- Left edge of box: Q1\n- Line inside box: Median (Q2)\n- Right edge of box: Q3\n- Whiskers: extend to min/max or fences\n```\n**Key insight:** The line inside the box always represents the median.'},

  {pos:44,diff:'hard',text:'If correlation r = 0, which statement is TRUE?',ch:[{letter:'A',text:'There is no relationship between variables'},{letter:'B',text:'There is no LINEAR relationship'},{letter:'C',text:'The variables are independent'},{letter:'D',text:'The slope is positive'}],ans:'B',sol:'**Interpret r = 0 correctly.**\n\n```\nr = 0 means:\n- No LINEAR correlation\n- Could still have non-linear relationships\n  (e.g., quadratic, exponential)\n\nr = 0 does NOT mean:\n- No relationship at all\n- Variables are independent\n```\n**Key insight:** Correlation measures only linear relationships. r = 0 indicates no linear correlation, but non-linear relationships may exist.'},

  {pos:45,diff:'hard',text:'The variance of a constant (all values the same) is:',ch:[{letter:'A',text:'The constant value'},{letter:'B',text:'0'},{letter:'C',text:'1'},{letter:'D',text:'Cannot determine'}],ans:'B',sol:'**Calculate variance when all values equal c.**\n\n```\nIf all values = c:\nMean = c\n\nVariance = Σ(x-μ)² / N\n         = Σ(c-c)² / N\n         = Σ(0)² / N\n         = 0 / N\n         = 0\n```\n**Key insight:** When there\'s no variability (all values the same), variance = 0.'},

  {pos:46,diff:'hard',text:'A sample of size 100 has mean 50 and standard deviation 10. What is the variance?',ch:[{letter:'A',text:'10'},{letter:'B',text:'100'},{letter:'C',text:'5'},{letter:'D',text:'1000'}],ans:'B',sol:'**Calculate variance from standard deviation.**\n\n```\nVariance = (standard deviation)²\n         = 10²\n         = 100\n\nSample size doesn\'t affect this relationship.\n```\n**Key insight:** Variance is always the square of standard deviation. s² = 100.'},

  {pos:47,diff:'hard',text:'In a normal distribution, what proportion of data has z-scores less than -2?',ch:[{letter:'A',text:'2.5%'},{letter:'B',text:'5%'},{letter:'C',text:'95%'},{letter:'D',text:'97.5%'}],ans:'A',sol:'**Use the empirical rule and symmetry.**\n\n```\nWithin ±2σ: ~95% of data\nOutside ±2σ: ~5% of data\n\nBy symmetry:\nBelow -2σ: ~2.5%\nAbove +2σ: ~2.5%\n```\n**Key insight:** In a normal distribution, approximately 2.5% of data has z-scores below -2.'},

  {pos:48,diff:'hard',text:'Which correlation coefficient indicates the strongest relationship?',ch:[{letter:'A',text:'r = 0.5'},{letter:'B',text:'r = -0.9'},{letter:'C',text:'r = 0.3'},{letter:'D',text:'r = 0.8'}],ans:'B',sol:'**Compare absolute values of correlation coefficients.**\n\n```\nStrength is measured by |r|:\n\n|0.5| = 0.5\n|-0.9| = 0.9 (strongest)\n|0.3| = 0.3\n|0.8| = 0.8\n```\n**Key insight:** The strength of correlation is determined by the absolute value of r. r = -0.9 indicates the strongest relationship (strong negative).'},

  {pos:49,diff:'hard',text:'A dataset has Q1=40, median=50, Q3=55. Is the distribution symmetric?',ch:[{letter:'A',text:'Yes'},{letter:'B',text:'No, right-skewed'},{letter:'C',text:'No, left-skewed'},{letter:'D',text:'Cannot determine'}],ans:'C',sol:'**Analyze quartile spacing.**\n\n```\nQ1 to median: 50-40 = 10\nMedian to Q3: 55-50 = 5\n\nLeft side (10) > Right side (5)\n→ Left-skewed\n```\n**Key insight:** Unequal spacing indicates skewness. Greater spacing on the left indicates left-skew (negative skew).'},

  {pos:50,diff:'hard',text:'The least squares regression line minimizes the sum of:',ch:[{letter:'A',text:'Residuals'},{letter:'B',text:'Squared residuals'},{letter:'C',text:'Absolute residuals'},{letter:'D',text:'Predicted values'}],ans:'B',sol:'**Understand the least squares criterion.**\n\n```\nLeast squares minimizes:\nΣ(residuals)² = Σ(y - ŷ)²\n\nNot just Σ(y - ŷ) because:\n- Positive and negative residuals would cancel\n- Squaring penalizes large errors more\n```\n**Key insight:** The least squares method minimizes the sum of squared residuals, giving the "best fit" line that minimizes overall prediction error.'},
];

async function insertQuestions() {
  // Get lesson_id for Advanced Statistics (6.2)
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', '6.2')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson 6.2:', lessonError);
    return;
  }

  const lessonId = lesson.id;
  console.log(`Found lesson 6.2 with ID: ${lessonId}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const { error } = await supabase
      .from('practice_questions')
      .insert({
        lesson_id: lessonId,
        subject: 'math',
        position: q.pos,
        difficulty: q.diff,
        title: `Advanced Statistics Q${q.pos}`,
        problem_text: q.text,
        choices: q.ch,
        correct_answer: q.ans,
        answer_explanation: q.sol
      });

    if (error) {
      console.error(`Error inserting Q${q.pos}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===\n`);
}

insertQuestions();
